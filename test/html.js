const setup = require('./index');

describe('test HTML injections', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe created by srcdoc (before)', async () => {
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

    it('should fail to use atob of an iframe created by srcdoc (after)', async () => {
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

    it('should fail to use atob of an iframe created by srcdoc with onload attribute of a nested iframe', async () => {
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

    it('should fail to use atob of an iframe created by innerHTML', async () => {
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

    it('should fail to use atob of an iframe created by outerHTML', async () => {
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

    it('should fail to use atob of an iframe created by insertAdjacentHTML', async () => {
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

    it('should fail to use atob of a div\'s child iframe created by innerHTML', async () => {
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

    it('should fail to use atob of via js execution via innerHTML call', async () => {
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

    it('should fail to use atob by leveraging a TrustedHTML node (with onload)', async () => {
        // reference: https://github.com/LavaMoat/snow/issues/16
        if (global.BROWSER === 'SAFARI' || global.BROWSER === 'FIREFOX') {
            return; // TrustedHTML is not a thing in safari/firefox
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

    it('should fail to use atob by leveraging a TrustedHTML node', async () => {
        // reference: https://github.com/LavaMoat/snow/issues/16
        if (global.BROWSER === 'SAFARI' || global.BROWSER === 'FIREFOX') {
            return; // TrustedHTML is not a thing in safari/firefox
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

    it('should fail to use atob of an iframe through onload as html', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv1.innerHTML = ('<iframe id="temp_id" src="/" onload="top.bypass([temp_id.contentWindow]);"/></iframe>');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an frame through onload as html', async () => {
        if (global.BROWSER === 'FIREFOX') {
            return; // document.write API not working on Firefox automation
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

    it('should fail to use atob of an object through onload as html', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv1.innerHTML = ('<object id="temp_id" data="/" onload="top.bypass([temp_id.contentWindow]);"/>');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an embed through onload as html', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv1.innerHTML = ('<embed id="temp_id" type="text/html" src="/" onload="top.bypass([temp_id.contentWindow]);">');
            }());
        });
        expect(result).toBe('V');
    });
});