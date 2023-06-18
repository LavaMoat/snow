const {setup} = require('./index');

describe('test HTML injections', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe created by srcdoc (before)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                top.bypass = bypass;
                ifr.srcdoc = `<script>top.bypass([this]);</script>`;
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by srcdoc (after)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                top.bypass = bypass;
                testdiv.appendChild(ifr);
                ifr.srcdoc = `<script>top.bypass([this]);</script>`;
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by srcdoc with onload attribute of a nested iframe', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                top.bypass = bypass;
                ifr.srcdoc = `
<iframe onload="top.bypass([this.contentWindow]);"></iframe>
<script>setTimeout(() => top.bypass([window]), 1000)</script>
`;
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by innerHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                div.innerHTML += '<iframe id="' + rnd + '"></iframe>';
                testdiv.appendChild(div);
                bypass([window[rnd].contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by outerHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.outerHTML = '<div><iframe id="' + rnd + '"></iframe></div>';
                bypass([window[rnd].contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by insertAdjacentHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.insertAdjacentHTML('beforebegin', '<div><iframe id="' + rnd + '"></iframe></div>');
                bypass([window[rnd].contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a div\'s child iframe created by innerHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                div.innerHTML += '<div><iframe id="' + rnd + '"></iframe></div>';
                testdiv.appendChild(div);
                bypass([window[rnd].contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of via js execution via innerHTML call', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.innerHTML += '<div><iframe id="xxx" onload="top.myatob = this.contentWindow.atob.bind(top)"></iframe></div>';
                bypass([xxx.contentWindow]);
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
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
                    createHTML: (string) => string.replace('', '')
                });
                const escaped = escapeHTMLPolicy.createHTML("<iframe id='xxx' onload='top.myatob = this.contentWindow.atob.bind(top)'></iframe>");
                testdiv.innerHTML = escaped;
                bypass([xxx.contentWindow]);
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
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
                    createHTML: (string) => string.replace('', '')
                });
                const escaped = escapeHTMLPolicy.createHTML("<iframe id='xxx'></iframe>");
                testdiv.innerHTML = escaped;
                bypass([xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe through onload as html', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv1.innerHTML = ('<iframe id="temp_id" src="/" onload="top.bypass([temp_id.contentWindow]);"/></iframe>');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an frame through onload as html', async function () {
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #58
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                document.write(`<frameset><frame id='temp_id' src='/' onload='top.bypass([temp_id.contentWindow]);'/></frame></frameset>`);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an object through onload as html', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv1.innerHTML = (`<object id="temp_id" data="${location.href}" onload="top.bypass([temp_id.contentWindow]);"/>`);
            }());
        });
        expect(result).toBe('V');
    });
    
    it('should fail to use atob of an iframe that was loaded via HTML in a new document (with innerHTML)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv1.innerHTML = `<iframe srcdoc="<iframe></iframe><script>top.bypass([frames[0])</script>"></iframe>`;
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was loaded via HTML in a new document (with srcdoc)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                var d = document.createElement('iframe');
                d.srcdoc = `<iframe></iframe><script>top.bypass([frames[0]])</script>`;
                testdiv.appendChild(d);
            }());
        });
        expect(result).toBe('V');
    });
});
