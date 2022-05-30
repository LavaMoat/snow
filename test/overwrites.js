const setup = require('./index');

describe('test overrides of native functions', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.concat override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            Object.defineProperty(Array.prototype, 'concat', {value: () => []});
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.includes override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            Object.defineProperty(Array.prototype, 'includes', {value: () => []});
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.push override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            Object.defineProperty(Array.prototype, 'push', {value: () => []});
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.slice override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            Object.defineProperty(Array.prototype, 'slice', {value: () => []});
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Function.prototype.call override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            Object.defineProperty(Function.prototype, 'call', {value: () => []});
            testdiv.appendChild(ifr);
            return ifr.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Element.prototype.parentElement override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            Object.defineProperty(Element.prototype, 'parentElement', {value: document.createElement('div')});
            testdiv.innerHTML += '<iframe id="xxx"></iframe>';
            return xxx.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Function.prototype.apply override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            Object.defineProperty(Function.prototype, 'apply', {value: () => 1});
            testdiv.innerHTML += '<iframe id="xxx"></iframe>';
            return xxx.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Element.prototype.getElementsByTagName override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            Object.defineProperty(Element.prototype, 'getElementsByTagName', {value: () => [document.head.firstChild]});
            testdiv.innerHTML += '<iframe id="xxx"></iframe>';
            return xxx.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.getOwnPropertyDescriptor override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            Object.defineProperty(Object, 'getOwnPropertyDescriptor', {value: 1})
            testdiv.innerHTML += '<iframe id="xxx"></iframe>';
            return xxx.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.getPrototypeOf override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            Object.defineProperty(Object, 'getPrototypeOf', {value: 1})
            testdiv.innerHTML += '<iframe id="xxx"></iframe>';
            return xxx.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via window.Error override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            Object.defineProperty(window, 'Error', {value: 1})
            testdiv.innerHTML += '<iframe id="xxx"></iframe>';
            return xxx.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.defineProperty override attempt', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            Object.defineProperty(Object, 'defineProperty', {value: 1})
            testdiv.innerHTML += '<iframe id="xxx"></iframe>';
            return xxx.contentWindow.atob('R0xBWklFUl9JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER');
    });
});