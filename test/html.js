const {setup} = require('./index');
const {generateErrorMessage, ERR_HTML_FRAMES_WITH_SRCDOC, ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN} = require('../src/log');

describe('test HTML injections', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe created by srcdoc (before)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.srcdoc = `<script>top.bypass([this, window]);</script>`;
                testdiv.appendChild(ifr);
                setTimeout(bypass, 100, [ifr.contentWindow[0], ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an iframe created by srcdoc (after)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                ifr.srcdoc = `<script>top.bypass([this, window]);</script>`;
                setTimeout(bypass, 100, [ifr.contentWindow[0], ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an iframe created by srcdoc as attribute (before)', async function () {
        if (global.CONFIG.SKIP_CSP_UNSAFE_INLINE_CHECKS) {
            this.skip();
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.setAttribute('srcdoc', `<script>top.bypass([this, window]);</script>`);
                testdiv.appendChild(ifr);
                setTimeout(bypass, 100, [ifr.contentWindow[0], ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an iframe created by srcdoc as attribute (after)', async function () {
        if (global.CONFIG.SKIP_CSP_UNSAFE_INLINE_CHECKS) {
            this.skip();
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                ifr.setAttribute('srcdoc', `<script>top.bypass([this, window]);</script>`);
                setTimeout(bypass, 100, [ifr.contentWindow[0], ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an iframe created by srcdoc with onload attribute of a nested iframe', async function () {
        if (global.CONFIG.SKIP_CSP_UNSAFE_INLINE_CHECKS) {
            this.skip();
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.srcdoc = `<iframe onload="top.bypass([this.contentWindow]);"></iframe>`;
                testdiv.appendChild(ifr);
                setTimeout(() => top.bypass([window]), 100)
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by innerHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                div.innerHTML += '<iframe id="' + rnd + '"></iframe>';
                testdiv.appendChild(div);
                bypass([window[rnd]?.contentWindow || window]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by outerHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.outerHTML = '<div><iframe id="' + rnd + '"></iframe></div>';
                bypass([window[rnd]?.contentWindow || window]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by insertAdjacentHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.insertAdjacentHTML('beforebegin', '<div><iframe id="' + rnd + '"></iframe></div>');
                bypass([window[rnd]?.contentWindow || window]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a div\'s child iframe created by innerHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                div.innerHTML += '<div><iframe id="' + rnd + '"></iframe></div>';
                testdiv.appendChild(div);
                bypass([window[rnd]?.contentWindow || window]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of via js execution via innerHTML call', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.innerHTML += '<div><iframe id="xxx" onload="top.myatob = this.contentWindow.atob.bind(top)"></iframe></div>';
                bypass([window['xxx']?.contentWindow || window]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob by leveraging a TrustedHTML node (with onload)', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/16
        if (global.BROWSER === 'SAFARI' || global.BROWSER === 'FIREFOX') {
            this.skip(); // TrustedHTML is not a thing in safari/firefox
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
                    createHTML: (string) => string.replace('', '')
                });
                const escaped = escapeHTMLPolicy.createHTML("<iframe id='xxx' onload='top.myatob = this.contentWindow.atob.bind(top)'></iframe>");
                testdiv.innerHTML = escaped;
                bypass([window['xxx']?.contentWindow || window]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob by leveraging a TrustedHTML node', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/16
        if (global.BROWSER === 'SAFARI' || global.BROWSER === 'FIREFOX') {
            this.skip(); // TrustedHTML is not a thing in safari/firefox
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
                    createHTML: (string) => string.replace('', '')
                });
                const escaped = escapeHTMLPolicy.createHTML("<iframe id='xxx'></iframe>");
                testdiv.innerHTML = escaped;
                bypass([window['xxx']?.contentWindow || window]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe through onload as html', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = ('<iframe id="temp_id" src="/" onload="top.bypass([temp_id.contentWindow]);"/></iframe>');
                setTimeout(top.bypass, 100, [window])
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an frame through onload as html', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                document.write(`<frameset><frame id='temp_id' src='/' onload='top.bypass([temp_id.contentWindow]);'/></frame></frameset>`);
                setTimeout(top.bypass, 100, [window])
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe introduced via multiple document.write args', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var f = document.createElement('iframe');
                testdiv.appendChild(f);
                f.contentDocument.write('<iframe id="tst');
                f.contentDocument.write('"></iframe><script>top.bypass([tst.contentWindow])</script>');
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN));
    });

    it('should fail to use atob of an iframe introduced via multiple document.write calls', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var f = document.createElement('iframe');
                testdiv.appendChild(f);
                f.contentDocument.write('<iframe id="tst', '"></iframe><script>top.bypass([tst.contentWindow])</script>');
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN));
    });

    it('should fail to use atob of an object through onload as html', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = (`<object id="temp_id" data="${location.href}" onload="top.bypass([temp_id.contentWindow]);"/>`);
                setTimeout(top.bypass, 100, [window])
            }());
        });
        expect(result).toBe('V');
    });
    
    it('should fail to use atob of an iframe that was loaded via HTML in a new document (with innerHTML)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = `<iframe srcdoc="<iframe></iframe><script>top.bypass([frames[0]])</script>"></iframe>`;
                setTimeout(top.bypass, 100, [window])
            }());
        });
        expect(result).toBe(generateErrorMessage(ERR_HTML_FRAMES_WITH_SRCDOC));
    });

    it('should fail to use atob of an iframe that was loaded via HTML in a new document (with srcdoc)', async function () {
        if (global.CONFIG.SKIP_CSP_UNSAFE_INLINE_CHECKS) {
            this.skip();
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var d = document.createElement('iframe');
                d.srcdoc = `<iframe></iframe><script>top.bypass([frames[0]])</script>`;
                testdiv.appendChild(d);
                setTimeout(top.bypass, 100, [window])
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an object that was loaded via HTML in a new document (with srcdoc)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var d = document.createElement('iframe');
                d.srcdoc = `<object id="temp_id" data="${location.href}"></object><script>top.bypass([frames[0]])</script>`;
                testdiv.appendChild(d);
                setTimeout(top.bypass, 100, [window])
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an embed that was loaded via HTML in a new document (with srcdoc)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var d = document.createElement('iframe');
                d.srcdoc = `<embed id="temp_id_1" type="text/html" src="/"><script>top.bypass([frames[0]])</script>`;
                testdiv.appendChild(d);
                setTimeout(top.bypass, 100, [window])
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window opened with an anchor element', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/80
        if (global.CONFIG.SKIP_CSP_UNSAFE_INLINE_CHECKS) {
            this.skip();
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv.innerHTML = `<a id="pwn" target="lolpwnd" href="javascript:opener.bypass([window])">`;
                document.querySelector("#pwn").click();
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window opened with a form element', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/80
        if (global.CONFIG.SKIP_CSP_UNSAFE_INLINE_CHECKS) {
            this.skip();
        }
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv.innerHTML = `<form id="pwn" method="GET" target="lolpwnd" action="javascript:opener.bypass([window])">`;
                document.querySelector("#pwn").submit();
            }());
        });
        expect(result).toBe('V');
    });
});
