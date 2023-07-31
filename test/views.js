const {setup} = require('./index');
const {generateErrorMessage, ERR_HTML_FRAMES} = require('../src/log');

describe('test different views', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a frame', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('frame');
                const set = document.createElement('frameset');
                set.appendChild(ifr);
                testdiv.appendChild(set);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a frame with srcdoc (html)', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/74
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                ifr = document.createElement('iframe');
                ifr.srcdoc = '<frameset><frame src="javascript:top.bypass([window, window])"></frameset>';
                document.body.appendChild(ifr);
                bypass([ifr.contentWindow[0], window]);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_HTML_FRAMES));
    });

    it('should fail to use atob of an object (html)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = ('<object id="temp_id" data="/" />');
                bypass([window?.temp_id?.contentWindow, window]);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_HTML_FRAMES));
    });

    it('should fail to use atob of an object', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const o = document.createElement('object');
                o.data = '/';
                o.id = 'temp_id';
                testdiv1.appendChild(o);
                bypass([window?.temp_id?.contentWindow, window]);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an object (after)', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/96
        if (global.CONFIG.SKIP_CSP_OBJECT_SRC_CHECKS) {
            this.skip();
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const o = document.createElement('object');
                o.id = 'temp_id';
                testdiv1.appendChild(o);
                o.data = '/';
                bypass([window?.temp_id?.contentWindow, window]);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an embed (html)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = (`<embed id="temp_id" type="text/html" src="${location.href}" onload="top.bypass([temp_id.contentWindow, window]);">`);
                setTimeout(bypass, 100, [window?.temp_id?.contentWindow, window]);
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_HTML_FRAMES));
    });

    it('should fail to use atob of an embed', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const o = document.createElement('embed');
                o.src = '/';
                o.id = 'temp_id';
                o.type = 'text/html';
                testdiv1.appendChild(o);
                bypass([window[0], window]);
            }());
        });
        expect(result).toBe('V,V');
    });
});