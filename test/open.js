const setup = require('./index');

describe('window.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via open API', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const win = open("");
                bypass([win]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const win = open("https://example1.com");
                setTimeout(() => {
                    if (!win || !win.location) {
                        return bypass([top]); // give up
                    }
                    win.location.href = "about:blank"
                    setTimeout(() => {
                        bypass([win]);
                    }, 1000)
                }, 1000);
            }
        });
        expect(result).toBe('V');
    });
});