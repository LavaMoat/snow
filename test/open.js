const setup = require('./index');

describe.only('window.open API', () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was created via open API', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            done(open("").atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });
});