const {setup} = require('./index');

describe('test DOM insertions', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe added by Node.prototype.appendChild', async function () {
        const result = await browser.executeAsync(function (done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of multiple iframes added to DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                const ifr2 = document.createElement('iframe');
                const ifr3 = document.createElement('iframe');
                testdiv.appendChild(ifr);
                testdiv.appendChild(ifr2);
                testdiv.appendChild(ifr3);
                bypass([ifr.contentWindow, ifr2.contentWindow, ifr3.contentWindow]);
            }());
        });
        expect(result).toBe('V,V,V');
    });

    it('should fail to use atob of an iframe added by Node.prototype.insertBefore', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.insertBefore(ifr, testdiv1);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Node.prototype.replaceChild', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.replaceChild(ifr, testdiv1);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.replaceWith', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv1.replaceWith(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.insertAdjacentElement', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv1.insertAdjacentElement('beforebegin', ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.append', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv1.append(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.before', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv1.before(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.prepend', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv1.prepend(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.after', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv1.after(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Element.prototype.replaceChildren', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.replaceChildren(testdiv1, ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Document.prototype.append', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                const d = document.createElement('div');
                const i = document.createElement('iframe');
                d.appendChild(i);
                ifr.contentWindow.document.documentElement.remove();
                ifr.contentWindow.document.append(d);
                bypass([d.firstChild.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Document.prototype.prepend', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                const d = document.createElement('div');
                const i = document.createElement('iframe');
                d.appendChild(i);
                ifr.contentWindow.document.documentElement.remove();
                ifr.contentWindow.document.prepend(d);
                bypass([d.firstChild.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Range.prototype.insertNode', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var range = document.createRange();
                var f = document.createElement("iframe");
                range.selectNode(document.getElementsByTagName("head")[0]);
                range.insertNode(f);
                bypass([f.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });
});