const setup = require('./index');

describe('test without Snow', async () => {
    before(setup.bind(null, false));

    it('should succeed to use top.atob normally', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                bypass([top]);
            }());
        });
        expect(result).toBe('X');
    });
});

describe('test normal cases', async () => {
    beforeEach(setup);

    it('should fail to use top.atob normally', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                bypass([top]);
            }());
        });
        expect(result).toBe('V');
    });
});