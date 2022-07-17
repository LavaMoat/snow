const setup = require('./index');

describe('test without Snow', async () => {
    before(setup.bind(null, false));

    it('should succeed to use top.atob normally', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            return atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('SNOW_IS_NOT_DISABLING_ATOB_IN_THIS_WINDOW');
    });
});

describe('test normal cases', async () => {
    beforeEach(setup);

    it('should fail to use top.atob normally', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            return atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, true); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});