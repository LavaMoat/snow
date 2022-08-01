const setup = require('./index');

describe('test HTML injections', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe created by innerHTML', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const rnd = Math.random().toString(36).substring(7);
            const div = document.createElement('div');
            div.innerHTML += '<iframe id="' + rnd + '"></iframe>';
            testdiv.appendChild(div);
            return window[rnd].contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe created by outerHTML', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const rnd = Math.random().toString(36).substring(7);
            const div = document.createElement('div');
            testdiv.appendChild(div);
            div.outerHTML = '<div><iframe id="' + rnd + '"></iframe></div>';
            return window[rnd].contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe created by insertAdjacentHTML', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const rnd = Math.random().toString(36).substring(7);
            const div = document.createElement('div');
            testdiv.appendChild(div);
            div.insertAdjacentHTML('beforebegin', '<div><iframe id="' + rnd + '"></iframe></div>');
            return window[rnd].contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of a div\'s child iframe created by innerHTML', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const rnd = Math.random().toString(36).substring(7);
            const div = document.createElement('div');
            div.innerHTML += '<div><iframe id="' + rnd + '"></iframe></div>';
            testdiv.appendChild(div);
            return window[rnd].contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of via js execution via innerHTML call', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const div = document.createElement('div');
            testdiv.appendChild(div);
            div.innerHTML += '<div><iframe onload="top.myatob = this.contentWindow.atob.bind(top)"></iframe></div>';
            return (top.myatob || atob)('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});