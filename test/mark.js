const {setup} = require('./index');
const {generateErrorMessage, ERR_HTML_FRAMES_WITH_SRCDOC} = require('../src/log');

describe('test marking mechanism is safe', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Map proto', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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
                    ifr.src = '/';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Object proto getOwnPropertyDescriptor prop', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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
                    ifr.src = '/';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Object proto hasOwnProperty prop', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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
                    ifr.src = '/';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that bypassed marking mechanism by redefining Object proto defineProperty prop', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
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
                    ifr.src = '/';
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });
});