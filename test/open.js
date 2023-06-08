const setup = require('./index');

describe('window.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via open API', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const win = open('');
                bypass([win]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const win = open('https://lavamoat.github.io/snow/test/index.html');
                setTimeout(() => {
                    if (!win || !win.location) {
                        return bypass([top]); // give up
                    }
                    win.location.href = 'about:blank';
                    setTimeout(() => {
                        bypass([win]);
                    }, 1000)
                }, 1000);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin and leaked it via postMessage (onmessage)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                onmessage = (a) => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                };
                open('https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin and leaked it via postMessage (message)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                addEventListener('message', a => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                });
                const x = {};
                x.toString = () => 'https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER';
                open(x);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via open API to javascript: scheme, leaked to opener and then changed to cross origin and back to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                open('javAscRipt\:opener.win=window;location.href="data:1"');
                setTimeout(() => {
                    if (!top.win) {
                        return bypass([top]); // give up
                    }
                    top.win.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([top.win]);
                    }, 500);
                }, 500);
            }());
        });
        expect(result).toBe('V');
    });
});

describe('document.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via document.open API', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const win = document.open('', '', '');
                bypass([win]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via document.open API to cross origin and then changed to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const win = document.open('https://lavamoat.github.io/snow/test/index.html', '', '');
                setTimeout(() => {
                    if (!win || !win.location) {
                        return bypass([top]); // give up
                    }
                    win.location.href = 'about:blank';
                    setTimeout(() => {
                        bypass([win]);
                    }, 1000)
                }, 1000);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via document.open API to cross origin and then changed to same origin and leaked it via postMessage (onmessage)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                onmessage = (a) => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                };
                document.open('https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER', '', '');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via document.open API to cross origin and then changed to same origin and leaked it via postMessage (message)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                addEventListener('message', a => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                });
                const x = {};
                x.toString = () => 'https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER';
                document.open(x, '', '');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via document.open API to javascript: scheme, leaked to opener and then changed to cross origin and back to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                document.open('javAscRipt\:opener.win=window;location.href="data:1"', '', '');
                setTimeout(() => {
                    if (!top.win) {
                        return bypass([top]); // give up
                    }
                    top.win.location.href = 'https://example.com/';
                    setTimeout(() => {
                        bypass([top.win]);
                    }, 500);
                }, 500);
            }());
        });
        expect(result).toBe('V');
    });
});