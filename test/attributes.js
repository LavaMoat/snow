const setup = require('./index');

describe('test DOM attributes', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that calls atob via onload setAttribute', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.setAttribute('onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNS', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.setAttributeNS('', 'onload', 'top.myatob = this.contentWindow.atob.bind(top);');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNode', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNodeNS', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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

    it('should fail to use atob of an iframe that calls atob via onload setNamedItem', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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

    it('should fail to use atob of an iframe that calls atob via onload setNamedItemNS', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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