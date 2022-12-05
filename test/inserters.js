const setup = require('./index');

describe('test DOM insertions', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe added by Node.prototype.appendChild', async () => {
        const result = await browser.executeAsync(function (done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of multiple iframes added to DOM', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                const ifr2 = document.createElement('iframe');
                const ifr3 = document.createElement('iframe');
                testdiv.appendChild(ifr);
                testdiv.appendChild(ifr2);
                testdiv.appendChild(ifr3);
                bypass([ifr.contentWindow, ifr2.contentWindow, ifr3.contentWindow]);
            }
        });
        expect(result).toBe('V,V,V');
    });

    it('should fail to use atob of an iframe added by Node.prototype.insertBefore', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv.insertBefore(ifr, testdiv1);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Node.prototype.replaceChild', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv.replaceChild(ifr, testdiv1);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.replaceWith', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv1.replaceWith(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.insertAdjacentElement', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv1.insertAdjacentElement('beforebegin', ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.append', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv1.append(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.before', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv1.before(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.prepend', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv1.prepend(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.after', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv1.after(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.replaceChildren', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv.replaceChildren(testdiv1, ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Document.prototype.append', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                const d = document.createElement('div');
                d.innerHTML += '<iframe></iframe>';
                ifr.contentWindow.document.documentElement.remove();
                ifr.contentWindow.document.append(d);
                bypass([d.firstChild.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Document.prototype.prepend', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                const d = document.createElement('div');
                d.innerHTML += '<iframe></iframe>';
                ifr.contentWindow.document.documentElement.remove();
                ifr.contentWindow.document.prepend(d);
                bypass([d.firstChild.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });
});