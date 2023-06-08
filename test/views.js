const {setup} = require('./index');

describe('test different views', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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

    it('should fail to use atob of a frame with srcdoc', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/74
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                ifr = document.createElement('iframe');
                ifr.srcdoc = '<frameset><frame src="javascript:top.bypass([window])"></frameset>';
                document.body.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an object', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = ('<object id="temp_id" data="/" />');
                bypass([temp_id.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an embed', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv1.innerHTML = (`<embed id="temp_id" type="text/html" src="${location.href}" onload="top.bypass([temp_id.contentWindow]);">`);
            }());
        });
        expect(result).toBe('V');
    });
});