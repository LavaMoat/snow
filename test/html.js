const setup = require('./index');

describe('test HTML injections', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe created by srcdoc', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                top.bypass = bypass;
                ifr.srcdoc = `<script>top.bypass([this]);</script>`
                testdiv.appendChild(ifr);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by srcdoc with onload attribute of a nested iframe', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                top.bypass = bypass;
                ifr.srcdoc = `
<iframe onload="top.bypass([this.contentWindow]);"></iframe>
<script>setTimeout(() => top.bypass([window]), 1000)</script>
`;
                testdiv.appendChild(ifr);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by innerHTML', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                div.innerHTML += '<iframe id="' + rnd + '"></iframe>';
                testdiv.appendChild(div);
                bypass([window[rnd].contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by outerHTML', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.outerHTML = '<div><iframe id="' + rnd + '"></iframe></div>';
                bypass([window[rnd].contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe created by insertAdjacentHTML', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.insertAdjacentHTML('beforebegin', '<div><iframe id="' + rnd + '"></iframe></div>');
                bypass([window[rnd].contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a div\'s child iframe created by innerHTML', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const rnd = Math.random().toString(36).substring(7);
                const div = document.createElement('div');
                div.innerHTML += '<div><iframe id="' + rnd + '"></iframe></div>';
                testdiv.appendChild(div);
                bypass([window[rnd].contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of via js execution via innerHTML call', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const div = document.createElement('div');
                testdiv.appendChild(div);
                div.innerHTML += '<div><iframe id="xxx" onload="top.myatob = this.contentWindow.atob.bind(top)"></iframe></div>';
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob by leveraging a TrustedHTML node (with onload)', async () => {
        // reference: https://github.com/LavaMoat/snow/issues/16
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
                    createHTML: (string) => string.replace('', '')
                });
                const escaped = escapeHTMLPolicy.createHTML("<iframe id='xxx' onload='top.myatob = this.contentWindow.atob.bind(top)'></iframe>");
                testdiv.innerHTML = escaped;
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob by leveraging a TrustedHTML node', async () => {
        // reference: https://github.com/LavaMoat/snow/issues/16
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
                    createHTML: (string) => string.replace('', '')
                });
                const escaped = escapeHTMLPolicy.createHTML("<iframe id='xxx'></iframe>");
                testdiv.innerHTML = escaped;
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });
});