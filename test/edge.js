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
});