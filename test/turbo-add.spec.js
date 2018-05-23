const turboAdd = require('../bin/turbo-add');

jest.mock('turbo-git-add', () => {
    function pepe () {}
    pepe.prototype.init = jest.fn();
    return pepe;
});

describe('turbo-add', () => {
    it('should return an object', () => {
        expect(typeof turboAdd).toBe('object');
    });
});