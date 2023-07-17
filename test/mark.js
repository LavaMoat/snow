const {setup} = require('./index');

describe('test marking mechanism is safe', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Map proto', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                Object.defineProperty(Map.prototype, 'has', {value:1});
                Object.defineProperty(Map.prototype, 'get', {value:1});
                Object.defineProperty(Map.prototype, 'set', {value:1});
                const ifr = document.createElement('iframe');
                ifr.src = 'https://lavamoat.github.io/snow/test/index.html';
                let once = false;
                ifr.addEventListener('load', () => {
                    if (once) {
                        bypass([ifr.contentWindow]);
                        return;
                    }
                    once = true;
                    ifr.src = 'about:blank';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Object proto getOwnPropertyDescriptor prop', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                Object.defineProperty(Object, 'getOwnPropertyDescriptor', {value:1});
                const ifr = document.createElement('iframe');
                ifr.src = 'https://lavamoat.github.io/snow/test/index.html';
                let once = false;
                ifr.addEventListener('load', () => {
                    if (once) {
                        bypass([ifr.contentWindow]);
                        return;
                    }
                    once = true;
                    ifr.src = 'about:blank';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Object proto hasOwnProperty prop', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                Object.defineProperty(Object, 'hasOwnProperty', {value:1});
                const ifr = document.createElement('iframe');
                ifr.src = 'https://lavamoat.github.io/snow/test/index.html';
                let once = false;
                ifr.addEventListener('load', () => {
                    if (once) {
                        bypass([ifr.contentWindow]);
                        return;
                    }
                    once = true;
                    ifr.src = 'about:blank';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Object proto defineProperty prop', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                Object.defineProperty(Object, 'defineProperty', {value:1});
                const ifr = document.createElement('iframe');
                ifr.src = 'https://lavamoat.github.io/snow/test/index.html';
                let once = false;
                ifr.addEventListener('load', () => {
                    if (once) {
                        bypass([ifr.contentWindow]);
                        return;
                    }
                    once = true;
                    ifr.src = 'about:blank';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(['V']).toContain(result);
    });
});