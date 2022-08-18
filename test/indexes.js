const setup = require('./index');

describe('test numeric indexes overrides', async () => {
    beforeEach(setup);

    // reference: https://github.com/LavaMoat/snow/issues/8

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.prototype property n override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;

            Object.defineProperty(Object.prototype, '0', {
                get() {
                    if (this?.payload?.isConnected) {
                        this.length = 0; // empty frames array
                        return undefined;
                    }
                    return this.payload;
                },
                set(value) {
                    // debugger;
                    this.length = 1;
                    this.payload = value;
                }
            });

            const fr = document.createElement('iframe');
            testdiv.appendChild(fr);
            return fr.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should crash snow via property n override attempt', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;

            for (let i = 0; i < 100000; i++) {
                Object.defineProperty(Object.prototype, i+'', {
                    get() {done('INDEX SETTER/GETTER INTERCEPTS SNOW')},
                    set() {done('INDEX SETTER/GETTER INTERCEPTS SNOW')},
                });

                Object.defineProperty(Array.prototype, i+'', {
                    get() {done('INDEX SETTER/GETTER INTERCEPTS SNOW')},
                    set() {done('INDEX SETTER/GETTER INTERCEPTS SNOW')},
                });
            }

            const fr = document.createElement('iframe');
            try {
                testdiv.appendChild(fr);
            } catch(e) {
                return e.message;
            }
            done(fr.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});