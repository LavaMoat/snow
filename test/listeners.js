const setup = require('./index');

describe('test listeners', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe added load event listener', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.addEventListener('load', () => {
                done(ifr.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
            });
            testdiv.appendChild(ifr);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should attach same load event listener only once', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
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
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe(1);
    });

    it('should successfully remove a load event listener', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
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
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('load event not called');
    });

    it('should successfully add a load event listener more than once when options are different', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
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
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe(2);
    });
});