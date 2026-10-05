// End-to-end suite: runs the real CLIs from bin/ against throwaway git repos
// in os.tmpdir(). Non-interactive commands run on any node; the inquirer-driven
// ones (init/commit/add) are driven through a pseudo-tty and need a node <= 18
// binary (inquirer 5 crashes with ERR_USE_AFTER_CLOSE on node >= 19) — one is
// auto-detected under ~/.nvm/versions/node and the tests skip if none exists.
const fs = require('fs');
const os = require('os');
const path = require('path');
const childProcess = require('child_process');

const REPO_ROOT = path.join(__dirname, '..');
const PKG_VERSION = require(path.join(REPO_ROOT, 'package.json')).version;

const NODE_MAJOR = parseInt(process.versions.node, 10);
// turbo-git-diff pipes through `sh` (child_process.exec), which does not
// resolve on windows (cmd.exe) — skip its e2e tests there.
const IT_NOT_WINDOWS = process.platform === 'win32' ? it.skip : it;

function sh(cmd, cwd) {
    return childProcess.execSync(cmd, { cwd: cwd, encoding: 'utf8' });
}

function makeTempRepo() {
    var dir = fs.mkdtempSync(path.join(os.tmpdir(), 'turbo-e2e-'));

    sh('git init -q', dir);
    sh('git config user.email e2e@test.local', dir);
    sh('git config user.name turbo-e2e', dir);
    return dir;
}

function removeTempRepo(dir) {
    try {
        fs.rmSync(dir, { recursive: true, force: true });
    } catch (e) { /* best effort */ }
}

function runTurbo(args, cwd, timeout) {
    var bin = path.join(REPO_ROOT, 'bin', 'turbo.js');

    return childProcess.spawnSync(process.execPath, [bin].concat(args), {
        cwd: cwd, encoding: 'utf8', timeout: timeout || 15000
    });
}

function runShim(relPath, args, cwd, timeout) {
    return childProcess.spawnSync(process.execPath,
        [path.join(REPO_ROOT, relPath)].concat(args || []), {
            cwd: cwd, encoding: 'utf8', timeout: timeout || 15000
        });
}

function findLegacyNode() {
    var fromEnv = process.env.TURBO_E2E_NODE;

    if (fromEnv && fs.existsSync(fromEnv)) {
        return fromEnv;
    }

    if (NODE_MAJOR <= 18) {
        return process.execPath;
    }

    var nvmRoot = path.join(os.homedir(), '.nvm', 'versions', 'node');

    try {
        var majors = {};

        fs.readdirSync(nvmRoot).forEach(function (dirName) {
            var major = parseInt(dirName.replace(/^v/, '').split('.')[0], 10);

            if (!isNaN(major) && major <= 18) {
                majors[major] = dirName;
            }
        });
        var best = Object.keys(majors).sort(function (a, b) {
            return b - a;
        })[0];

        if (best) {
            return path.join(nvmRoot, majors[best], 'bin', 'node');
        }
    } catch (e) { /* no nvm dir */ }
    return null;
}

var LEGACY_NODE = findLegacyNode();
var HAS_PTY = childProcess.spawnSync('sh', ['-c', 'command -v script'],
    { encoding: 'utf8' }).status === 0;
var CAN_RUN_INTERACTIVE = Boolean(LEGACY_NODE && HAS_PTY);

// Drives the given bin script in a pseudo-tty so inquirer prompts can be
// used non-interactively. Each step waits until `waitFor` shows up in the
// output before typing `data`, so slow startup or a loaded machine cannot
// desync the keystroke timing.
function runInPty(nodeBin, relScript, cwd, steps) {
    var scriptPath = path.join(REPO_ROOT, relScript);
    var child;

    if (process.platform === 'darwin') {
        // BSD script (macOS) takes the command as plain args, no -c flag
        child = childProcess.spawn('script', ['-q', '/dev/null', nodeBin, scriptPath],
            { cwd: cwd });
    } else {
        var cmd = [nodeBin, scriptPath].map(function (p) {
            return "'" + p + "'";
        }).join(' ');

        child = childProcess.spawn('script', ['-qec', cmd, '/dev/null'], { cwd: cwd });
    }
    var out = '';

    child.stdout.on('data', function (d) { out += d; });
    child.stderr.on('data', function (d) { out += d; });

    return new Promise(function (resolve, reject) {
        var killer = setTimeout(function () {
            child.kill('SIGKILL');
            reject(new Error('timed out in pty run of ' + relScript + '. output:\n' + out));
        }, 60000);

        function finishStep(stepIndex) {
            if (stepIndex >= steps.length) {
                return;
            }

            var step = steps[stepIndex];
            var waited = 0;
            var poll = setInterval(function () {
                waited += 100;
                if (out.indexOf(step.waitFor) !== -1 && waited >= 300) {
                    clearInterval(poll);
                    setTimeout(function () {
                        child.stdin.write(step.data);
                        finishStep(stepIndex + 1);
                    }, 400);
                } else if (waited > 25000) {
                    clearInterval(poll);
                    clearTimeout(killer);
                    child.kill('SIGKILL');
                    reject(new Error('prompt "' + step.waitFor + '" never appeared for ' +
                        relScript + '. output:\n' + out));
                }
            }, 100);
        }

        child.on('error', function (err) {
            clearTimeout(killer);
            reject(err);
        });
        child.on('close', function (code) {
            clearTimeout(killer);
            resolve({ code: code, out: out });
        });
        finishStep(0);
    });
}

describe('turbo e2e (temp git repo)', function () {
    describe('non-interactive commands (any node)', function () {
        var repo;

        beforeAll(function () {
            repo = makeTempRepo();
            fs.writeFileSync(path.join(repo, 'a.txt'), 'a\n');
            sh('git add a.txt', repo);
            sh('git commit -qm "[ADD] add file a.txt"', repo);
            fs.appendFileSync(path.join(repo, 'a.txt'), 'b\n');
            sh('git commit -qam "[FIX] fix file a.txt"', repo);
            fs.writeFileSync(path.join(repo, 'b.txt'), 'c\n');
            sh('git add b.txt', repo);
            sh('git commit -qm "[MOD] add file b.txt"', repo);
        });

        afterAll(function () {
            removeTempRepo(repo);
        });

        it('turbo --version prints the package version', function () {
            var res = runTurbo(['--version'], repo);

            expect(res.status).toBe(0);
            expect(res.stdout.trim()).toBe(PKG_VERSION);
        }, 15000);

        it('turbo --help lists every command', function () {
            var res = runTurbo(['--help'], repo);

            expect(res.status).toBe(0);
            ['add', 'commit', 'diff', 'log', 'init'].forEach(function (cmd) {
                expect(res.stdout).toMatch(new RegExp('\\b' + cmd + '\\b'));
            });
        }, 15000);

        it('turbo log colorizes tagged commits per the default convention', function () {
            var res = runTurbo(['log'], repo);

            expect(res.status).toBe(0);
            expect(res.stdout).toContain('\x1b[32m[ADD] add file a.txt');
            expect(res.stdout).toContain('\x1b[33m[FIX] fix file a.txt');
            expect(res.stdout).toContain('\x1b[34m[MOD] add file b.txt');
        }, 15000);

        it('turbo log honors a custom .turbogit convention', function () {
            fs.writeFileSync(path.join(repo, '.turbogit'), JSON.stringify({
                turboLog: { gitLogCommandParams: '-n50 --reverse' },
                turboCommit: {
                    textAskTag: 'tag:', textAskComponent: '',
                    textAskTitle: 'title:', textAskDesc: 'desc:'
                },
                commitConvention: {
                    tagPrefix: '', tagSuffix: '',
                    commitDesc: [{ tag: '[E2E]', desc: 'custom tag', color: 'cyan' }]
                },
                debug: false
            }, null, 4));
            sh('git commit -q --allow-empty -m "[E2E] custom convention commit"', repo);

            var res = runTurbo(['log'], repo);

            expect(res.status).toBe(0);
            expect(res.stdout).toContain('\x1b[36m[E2E] custom convention commit');
        }, 15000);

        IT_NOT_WINDOWS('turbo diff pipes through diff-so-fancy', function () {
            fs.appendFileSync(path.join(repo, 'b.txt'), 'd\n');
            var res = runTurbo(['diff'], repo);

            expect(res.stdout).toContain('modified: b.txt');
            expect(res.stdout).toContain('d');
        }, 15000);

        it('git tl shim prints the turbo log', function () {
            var res = runShim('bin/git/git-tl.js', [], repo);

            expect(res.status).toBe(0);
            expect(res.stdout).toContain('[E2E] custom convention commit');
        }, 15000);

        IT_NOT_WINDOWS('git td shim pipes through diff-so-fancy', function () {
            var res = runShim('bin/git/git-td.js', [], repo);

            expect(res.status).toBe(0);
            expect(res.stdout).toContain('modified: b.txt');
        }, 15000);

        it('git turbo shim forwards to the commander app', function () {
            var res = runShim('bin/git/git-turbo.js', ['--version'], repo);

            expect(res.status).toBe(0);
            expect(res.stdout.trim()).toBe(PKG_VERSION);
        }, 15000);
    });

    (CAN_RUN_INTERACTIVE ? describe : describe.skip)('interactive commands (pty + node <= 18)', function () {
        beforeAll(function () {
            console.log('    driving inquirer flows with node: ' + LEGACY_NODE);
        });

        describe('turbo init (git ti)', function () {
            var repo;

            beforeAll(function () {
                repo = makeTempRepo();
            });

            afterAll(function () {
                removeTempRepo(repo);
            });

            it('writes a .turbogit file at the repo root', function () {
                return runInPty(LEGACY_NODE, 'bin/git/git-ti.js', repo, [
                    { waitFor: 'commit convention', data: '\n' },
                    { waitFor: 'Continue?', data: 'y\n' }
                ]).then(function (res) {
                    if (res.code !== 0) {
                        console.error('pty output:\n' + res.out);
                    }

                    expect(res.code).toBe(0);
                    var confPath = path.join(repo, '.turbogit');

                    expect(fs.existsSync(confPath)).toBe(true);
                    var conf = JSON.parse(fs.readFileSync(confPath, 'utf8'));

                    expect(conf.commitConvention.commitDesc.length).toBeGreaterThan(0);
                });
            }, 60000);
        });

        describe('turbo commit (git tc)', function () {
            var repo;

            beforeAll(function () {
                repo = makeTempRepo();
                fs.writeFileSync(path.join(repo, 'staged.txt'), 'content\n');
                sh('git add staged.txt', repo);
            });

            afterAll(function () {
                removeTempRepo(repo);
            });

            it('creates a [ADD] tagged commit from tag/title/description prompts', function () {
                return runInPty(LEGACY_NODE, 'bin/git/git-tc.js', repo, [
                    { waitFor: 'Select tag', data: '\n' },
                    { waitFor: 'Type commit title', data: 'e2e title\n' },
                    { waitFor: 'Commit description', data: 'e2e bullet\n' }
                ]).then(function (res) {
                    if (res.code !== 0) {
                        console.error('pty output:\n' + res.out);
                    }

                    expect(res.code).toBe(0);
                    var subject = sh('git log -1 --format=%s', repo).trim();

                    expect(subject).toBe('[ADD] e2e title');
                    expect(sh('git log -1 --format=%b', repo)).toMatch(/e2e bullet/);
                });
            }, 60000);
        });

        describe('turbo add (git ta)', function () {
            var repo;

            beforeAll(function () {
                repo = makeTempRepo();
                fs.writeFileSync(path.join(repo, 'seed.txt'), 'seed\n');
                sh('git add seed.txt', repo);
                sh('git commit -qm "[ADD] seed"', repo);
                fs.writeFileSync(path.join(repo, 'candidate.txt'), 'candidate\n');
            });

            afterAll(function () {
                removeTempRepo(repo);
            });

            it('stages the file selected in the checkbox list', function () {
                return runInPty(LEGACY_NODE, 'bin/git/git-ta.js', repo, [
                    { waitFor: 'Select files to add', data: '\x1b[B' },
                    { waitFor: 'Select files to add', data: ' ' },
                    { waitFor: 'Select files to add', data: '\n' }
                ]).then(function (res) {
                    if (res.code !== 0) {
                        console.error('pty output:\n' + res.out);
                    }

                    expect(res.code).toBe(0);
                    var status = sh('git status --porcelain', repo);

                    expect(status).toMatch(/^A {2}candidate\.txt/m);
                });
            }, 60000);
        });
    });
});
