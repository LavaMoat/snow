const {setup} = require('./index');

describe('test different iframe src', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe with src about:blank', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                const ifr = document.createElement('iframe');
                ifr.src = 'about:blank';
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of an iframe with src javascript:', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                const ifr = document.createElement('iframe');
                ifr.src = 'javascript:;';
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of an iframe with src javascript: via the javascript: (src then inject)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                window[rnd] = bypass;
                const ifr = document.createElement('iframe');
                ifr.src = `javascript:top["${rnd}"]([this])`;
                testdiv.appendChild(ifr);
            }());
        });
        expect(['V', 'CSP-script-src-elem']).toContain(result);
    });

    it('should fail to use atob of an iframe with src javascript: via the javascript: (inject then src)', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                window[rnd] = bypass;
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                ifr.src = `javascript:top["${rnd}"]([this])`;
            }());
        });
        expect(['V', 'CSP-script-src-elem']).toContain(result);
    });
});