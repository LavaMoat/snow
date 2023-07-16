const {setup} = require('./index');

describe('test different views', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of a frame', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                const ifr = document.createElement('frame');
                const set = document.createElement('frameset');
                set.appendChild(ifr);
                testdiv.appendChild(set);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of a frame with srcdoc', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/74
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                ifr = document.createElement('iframe');
                ifr.srcdoc = '<frameset><frame src="javascript:top.bypass([window])"></frameset>';
                document.body.appendChild(ifr);
            }());
        });
        expect(['V', 'CSP-script-src-elem']).toContain(result);
    });

    it('should fail to use atob of an object', async function () {
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #59
        }
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                testdiv1.innerHTML = (`<object id="temp_id" data="${location.href}" />`);
                setTimeout(() => temp_id.contentWindow && bypass([temp_id.contentWindow]), 1000);
            }());
        });
        expect(['V', 'CSP-object-src']).toContain(result);
    });

    it('should fail to use atob of an embed', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                testdiv1.innerHTML = (`<embed id="temp_id" type="text/html" src="${location.href}" onload="top.bypass([temp_id.contentWindow]);">`);
            }());
        });
        expect(['V', 'CSP-object-src', 'CSP-script-src-attr']).toContain(result);
    });
});