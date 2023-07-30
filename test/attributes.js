const {setup} = require('./index');

describe('test DOM attributes', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe that calls atob via onload setAttribute', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.setAttribute('onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNS', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.setAttributeNS('', 'onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNode', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                document.body.setAttributeNS('', 'onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                ifr.setAttributeNode(document.body.getAttributeNode('onload').cloneNode())
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNodeNS', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                document.body.setAttributeNS('', 'onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                ifr.setAttributeNodeNS(document.body.getAttributeNode('onload').cloneNode())
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that calls atob via onload setNamedItem', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                document.body.setAttributeNS('', 'onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                ifr.attributes.setNamedItem(document.body.getAttributeNode('onload').cloneNode())
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that calls atob via onload setNamedItemNS', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                document.body.setAttributeNS('', 'onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                ifr.attributes.setNamedItemNS(document.body.getAttributeNode('onload').cloneNode())
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });
});