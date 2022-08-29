const setup = require('./index');

describe.skip('window.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via open API', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const win = open("");
                bypass([win]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const win = open("https://example.com");
                setTimeout(() => {
                    win.location.href = "about:blank";
                    setTimeout(() => {
                        bypass([win]);
                    }, 1000)
                }, 1000);
            }
        });
        expect(result).toBe('Y');
    });
});