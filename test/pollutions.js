const setup = require('./index');

describe('test overrides of objects for prototype pollution attempts', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was under sabotage attempt via Securely onloadS prototype pollution', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win || top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(ifr, 'onloadS', {value: 0});
                ifr.setAttribute('onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                testdiv.appendChild(ifr);
                done(top.myatob('WA=='), [ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Securely removeAttributeS prototype pollution (attribute)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win || top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(ifr, 'removeAttributeS', {
                    value: () => {
                    }
                });
                ifr.setAttribute('onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                testdiv.appendChild(ifr);
                done(top.myatob('WA=='), [ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Securely addEventListenerS prototype pollution', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win || top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(ifr, 'addEventListenerS', {
                    value: () => {
                    }
                });
                ifr.setAttribute('onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                testdiv.appendChild(ifr);
                done(top.myatob('WA=='), [ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Securely toStringS prototype pollution (TrustedHTML)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win || top).atob('WA==')).join(','));
            {
                const testdiv = document.documentElement;
                const x = document.createElement('x');
                Object.defineProperty(testdiv, 'toStringS', {value: () => '[object TrustedHTML]', writable: true});
                x.innerHTML = ('<iframe></iframe>');
                testdiv.appendChild(x);
                done(x.firstChild.contentWindow.atob('WA=='), [x.firstChild.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Securely nodeTypeS prototype pollution', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win || top).atob('WA==')).join(','));
            {
                const testdiv = document.documentElement;
                const x = document.createElement('x');
                Object.defineProperty(testdiv, 'nodeTypeS', {
                    value: () => Element.prototype.DOCUMENT_NODE,
                    writable: true
                });
                x.innerHTML = ('<iframe></iframe>');
                testdiv.appendChild(x);
                done(x.firstChild.contentWindow.atob('WA=='), [x.firstChild.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Securely toStringS prototype pollution (getting correct prototype)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win || top).atob('WA==')).join(','));
            {
                const testdiv = document.documentElement;
                const x = document.createElement('x');
                Object.defineProperty(testdiv, 'toStringS', {value: () => '[object DocumentFragment]', writable: true});
                x.innerHTML = ('<iframe></iframe>');
                try {
                    testdiv.appendChild(x);
                } catch (e) {
                }
                done(x.firstChild.contentWindow.atob('WA=='), [x.firstChild.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Securely toStringS prototype pollution (telling if element is frame)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win || top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(ifr, 'toStringS', {value: () => 'notAnIframe'});
                ifr.onload = () => top.myatob = ifr.contentWindow.atob.bind(top);
                testdiv.appendChild(ifr);
                done(top.myatob('WA=='), [ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });
});