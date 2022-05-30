const setup = require('./index');

describe('test different views', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an frame', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('frame');
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an object', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            testdiv1.innerHTML = ('<object id="temp_id" data="/" />');
            return temp_id.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an embed', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            testdiv1.innerHTML = ('<embed id="temp_id" type="text/html" src="/">');
            return window[0].atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });
});