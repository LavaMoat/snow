const setup = require('./index');

describe('window.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via open API', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const win = open('');
                bypass([win]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const win = open('https://example1.com');
                setTimeout(() => {
                    if (!win || !win.location) {
                        return bypass([top]); // give up
                    }
                    win.location.href = 'about:blank';
                    setTimeout(() => {
                        bypass([win]);
                    }, 1000)
                }, 1000);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin and leaked it via postMessage (onmessage)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                onmessage = (a) => {
                    const x = a.source;
                    x.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                };
                open('https://lavamoat.github.io/snow/test/test-util.html');
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin and leaked it via postMessage (message)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                addEventListener('message', a => {
                    const x = a.source;
                    x.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                });
                const x = {};
                x.toString = () => 'https://lavamoat.github.io/snow/test/test-util.html';
                open(x);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to javascript: scheme, leaked to opener and then changed to cross origin and back to same origin', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                open('javAscRipt\:opener.win=window;location.href="data:1"');
                setTimeout(() => {
                    if (!top.win) {
                        return bypass([top]); // give up
                    }
                    top.win.location.href = 'https://example.com';
                    setTimeout(() => {
                        bypass([top.win]);
                    }, 500);
                }, 500);
            }
        });
        expect(result).toBe('V');
    });
});