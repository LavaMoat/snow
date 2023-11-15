const {setup} = require('./index');
const {generateErrorMessage, ERR_OPENED_PROP_ACCESS_BLOCKED, ERR_OPEN_JS_SCHEME_BLOCKED} = require('../src/log');

describe('window.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via open API', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const win = open('');
                bypass([win]);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin and leaked it via postMessage (onmessage)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const href = location.href;
                onmessage = (a) => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = href;
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                };
                open('https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER');
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin and leaked it via postMessage (message)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const href = location.href;
                addEventListener('message', a => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = href;
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                });
                const x = {};
                x.toString = () => 'https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER';
                open(x);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via open API to javascript: scheme, leaked to opener and then changed to cross origin and back to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const href = location.href;
                open('javAscRipt\:opener.win=window;location.href="data:1"');
                setTimeout(() => {
                    if (!top.win) {
                        return bypass([top]); // give up
                    }
                    top.win.location.href = href;
                    setTimeout(() => {
                        bypass([top.win]);
                    }, 500);
                }, 500);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPEN_JS_SCHEME_BLOCKED));
    });
});

describe('window.open API (same origin)', () => {
    beforeEach(setup.bind(null, 'https://lavamoat.github.io/snow/test/index.html'));

    it('should fail to use atob of a window that was created via open API which then opened an iframe', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                open('https://lavamoat.github.io/snow/test/index.html?OPENER_IFRAME_HELPER');
            }());
        });
        expect(result).toBe('V');
    });
});

describe('document.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via Document.prototype.open API', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const win = Document.prototype.open.call(document, '', '', '');
                bypass([win]);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via document.open API', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const win = document.open('', '', '');
                bypass([win]);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via document.open API to cross origin and then changed to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via document.open API to cross origin and then changed to same origin and leaked it via postMessage (onmessage)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const href = location.href;
                onmessage = (a) => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = href;
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                };
                document.open('https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER', '', '');
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via document.open API to cross origin and then changed to same origin and leaked it via postMessage (message)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const href = location.href;
                addEventListener('message', a => {
                    const x = a.source;
                    if (!x || !x.location) {
                        return bypass([top]); // give up
                    }
                    x.location.href = href;
                    setTimeout(() => {
                        bypass([x]);
                    }, 1000);
                });
                const x = {};
                x.toString = () => 'https://lavamoat.github.io/snow/test/index.html?SET_TIMEOUT_HELPER';
                document.open(x, '', '');
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED));
    });

    it('should fail to use atob of a window that was created via document.open API to javascript: scheme, leaked to opener and then changed to cross origin and back to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const href = location.href;
                document.open('javAscRipt\:opener.win=window;location.href="data:1"', '', '');
                setTimeout(() => {
                    if (!top.win) {
                        return bypass([top]); // give up
                    }
                    top.win.location.href = href;
                    setTimeout(() => {
                        bypass([top.win]);
                    }, 500);
                }, 500);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_OPEN_JS_SCHEME_BLOCKED));
    });
});