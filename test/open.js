const setup = require('./index');

describe.skip('window.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via open API', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            done(open("").atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of a window that was created via open API to cross origin and then changed to same origin', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const win = open("https://example.com");
            setTimeout(() => {
                win.location.href = "about:blank";
                setTimeout(() => {
                    done(win.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
                }, 1000)
            }, 1000);
        }, true); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});