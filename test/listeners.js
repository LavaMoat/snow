const setup = require('./index');

describe('test listeners', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe added load event listener', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.addEventListener('load', () => {
                    bypass([ifr.contentWindow]);
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should attach same load event listener only once', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                let count = 0;
                const cb = () => {
                    count += 1;
                };
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                testdiv.appendChild(ifr);
                setTimeout(() => done(count));
            }());
        });
        expect(result).toBe(1);
    });

    it('should successfully remove a load event listener', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                const cb = () => {
                    done('load event called');
                };
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.removeEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.removeEventListener('load', cb);
                ifr.removeEventListener('load', cb);
                testdiv.appendChild(ifr);
                setTimeout(() => done('load event not called'));
            }());
        });
        expect(result).toBe('load event not called');
    });

    it('should successfully add a load event listener more than once when options are different', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                let count = 0;
                const cb = () => {
                    count += 1;
                };
                ifr.addEventListener('load', cb, true);
                ifr.addEventListener('load', cb, false);
                ifr.addEventListener('load', cb, {capture: true});
                ifr.addEventListener('load', cb, {capture: false});
                ifr.addEventListener('load', cb, {once: false});
                ifr.addEventListener('load', cb, {once: true});
                ifr.addEventListener('load', cb, {passive: false});
                ifr.addEventListener('load', cb, {passive: true});
                ifr.addEventListener('load', cb, {signal: new AbortController().signal});
                ifr.addEventListener('load', cb, {signal: new AbortController().signal});
                ifr.addEventListener('load', cb, {capture: true, once: true});
                ifr.addEventListener('load', cb, {capture: true, once: true, passive: true});
                testdiv.appendChild(ifr);
                setTimeout(() => done(count));
            }());
        });
        expect(result).toBe(2);
    });
});