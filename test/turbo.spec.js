const turbo = require('../bin/turbo');

jest.mock('commander', () => {
    const mock = jest.genMockFromModule('commander');

    mock.command = () => {
        return mock;
    };
    mock.version = () => {
        return mock;
    };

    return mock;
});

describe('turbo', () => {
    it('should return an object', () => {
        expect(typeof turbo).toBe('object');
    });
});