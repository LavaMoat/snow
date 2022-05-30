const setup = require('./index');

describe('test different iframe src', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe with src about:blank', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.src = 'about:blank';
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe with src javascript:', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.src = 'javascript:;';
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe with src javascript: via the javascript: (src then inject)', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const rnd = Math.random().toString(36).substring(7);
            window[rnd] = done;
            const ifr = document.createElement('iframe');
            ifr.src = `javascript:top["${rnd}"](this.atob("R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c="))`;
            testdiv.appendChild(ifr);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe with src javascript: via the javascript: (inject then src)', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const rnd = Math.random().toString(36).substring(7);
            window[rnd] = done;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            ifr.src = `javascript:top["${rnd}"](this.atob("R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c="))`;
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });



    it('should not try to wrap data: iframe since it is a cross origin', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.src = 'data:text/html,<script>top.postMessage(this.atob("R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c="), "*")</scr'+'ipt>';
            testdiv.appendChild(ifr);
            window.onmessage = (m) => done(m.data);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('GLAZIER_IS_NOT_DISABLING_ATOB_IN_THIS_WINDOW');
    });
});