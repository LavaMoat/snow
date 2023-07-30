const {setup} = require('./index');

describe('test numeric indexes overrides', async function () {
    beforeEach(setup);

    // reference: https://github.com/LavaMoat/snow/issues/8

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.prototype property n override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
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
                bypass([fr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should crash snow via property n override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                for (let i = 0; i < 10000; i++) {
                    Object.defineProperty(Object.prototype, i + '', {
                        get() {
                            done('INDEX SETTER/GETTER INTERCEPTS SNOW')
                        },
                        set() {
                            done('INDEX SETTER/GETTER INTERCEPTS SNOW')
                        },
                    });

                    Object.defineProperty(Array.prototype, i + '', {
                        get() {
                            done('INDEX SETTER/GETTER INTERCEPTS SNOW')
                        },
                        set() {
                            done('INDEX SETTER/GETTER INTERCEPTS SNOW')
                        },
                    });
                }

                const fr = document.createElement('iframe');
                try {
                    testdiv.appendChild(fr);
                } catch (e) {
                    return e.message;
                }
                bypass([fr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });
});