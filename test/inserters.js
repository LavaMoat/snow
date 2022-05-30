const setup = require('./index');

describe('test DOM insertions', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe added by Node.prototype.appendChild', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of multiple iframes added to DOM', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            const ifr2 = document.createElement('iframe');
            const ifr3 = document.createElement('iframe');
            testdiv.appendChild(ifr);
            testdiv.appendChild(ifr2);
            testdiv.appendChild(ifr3);
            return [
                ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='),
                ifr2.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='),
                ifr3.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=')
            ].join(',');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER,ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER,ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Node.prototype.insertBefore', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.insertBefore(ifr, testdiv1);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Node.prototype.replaceChild', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.replaceChild(ifr, testdiv1);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Element.prototype.replaceWith', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv1.replaceWith(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Element.prototype.insertAdjacentElement', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv1.insertAdjacentElement('beforebegin', ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Element.prototype.append', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv1.append(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Element.prototype.before', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv1.before(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Element.prototype.prepend', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv1.prepend(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Element.prototype.after', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv1.after(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Element.prototype.replaceChildren', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.replaceChildren(testdiv1, ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Document.prototype.append', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            const d = document.createElement('div');
            d.innerHTML += '<iframe></iframe>';
            ifr.contentWindow.document.documentElement.remove();
            ifr.contentWindow.document.append(d);
            return d.firstChild.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe added by Document.prototype.prepend', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            testdiv.appendChild(ifr);
            const d = document.createElement('div');
            d.innerHTML += '<iframe></iframe>';
            ifr.contentWindow.document.documentElement.remove();
            ifr.contentWindow.document.prepend(d);
            return d.firstChild.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });
});