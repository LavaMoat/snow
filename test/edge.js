const setup = require('./index');

describe('special cases', () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was attached as cross origin and then redirected back to same origin', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.src = "https://x.com";
            document.head.appendChild(ifr);
            const zzz = ifr.contentWindow;
            setTimeout(() => {
                ifr.src = "about:blank";
                setTimeout(() => {
                    done(zzz.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
                }, 1000);
            }, 1000);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that was attached as cross origin and then redirected back to same origin (complex)', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.src = "https://x.com";
            document.head.appendChild(ifr);
            const zzz = ifr.contentWindow;
            setTimeout(() => {
                ifr.src = "about:blank";
                setTimeout(() => {
                    ifr.src = "https://x.com";
                    setTimeout(() => {
                        ifr.src = "about:blank";
                        setTimeout(() => {
                            done(zzz.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an embed that was cross origin and then same origin', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            testdiv1.innerHTML = ('<embed id="temp_id_1" type="text/html" src="/">');
            testdiv2.innerHTML = ('<embed id="temp_id_2" type="text/html" src="https://x.com">');
            setTimeout(() => {
                temp_id_2.src = temp_id_1.src;
                temp_id_1.src = 'https://x.com';
                setTimeout(() => {
                    temp_id_1.src = temp_id_2.src;
                    setTimeout(() => {
                        done(JSON.stringify([
                            window[0].atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='),
                            window[1].atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='),
                        ]))
                    }, 1000);
                }, 1000);
            }, 1000);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe(JSON.stringify(['ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW', 'ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW']));
    });

    it('should fail to use atob of an iframe that was reattached to dom', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            setTimeout(() => {
                ifr.remove();
                setTimeout(() => {
                    testdiv.appendChild(ifr);
                    done(ifr.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
                });
            });
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe within an iframe within an iframe', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const rnd = Math.random().toString(36).substring(7);
            window[rnd] = done;
            const ifr = document.createElement('iframe');
            ifr.onload = () => {
                const ifr2 = ifr.contentWindow.document.createElement('iframe');
                ifr2.addEventListener('load', () => {
                    const ifr3 = ifr2.contentWindow.document.createElement('iframe');
                    ifr3.onload = () => {
                        top[rnd](ifr3.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
                    };
                    ifr2.contentWindow.document.body.appendChild(ifr3);
                });
                ifr.contentWindow.document.body.appendChild(ifr2);
            };
            testdiv.appendChild(ifr);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that had its document written', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            ifr.contentDocument.write('<iframe id="xxx"></iframe>')
            return ifr.contentWindow.xxx.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that had its document written-ln', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            ifr.contentDocument.writeln('<iframe id="xxx"></iframe>')
            return ifr.contentWindow.xxx.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe when all element in DOM changed their own toString behaviour', async () => {
        // reference: https://github.com/LavaMoat/snow/issues/9
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const all = document.querySelectorAll('*');
            const fr = document.createElement('iframe');
            for (const node of [...all, fr]) {
                Object.defineProperty(node, Symbol.toStringTag, { value: 'bypassResetOnload' });
            }
            fr.onload = () => {
                done(fr.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
            };
            testdiv.appendChild(fr);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});