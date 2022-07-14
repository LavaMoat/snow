const setup = require('./index');

describe('test DOM attributes', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that calls atob via onload setAttribute', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.setAttribute('onload', 'top.myatob = window[1].atob.bind(top);');
            testdiv.appendChild(ifr);
            return top.myatob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNS', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            ifr.setAttributeNS('', 'onload', 'top.myatob = window[1].atob.bind(top);');
            testdiv.appendChild(ifr);
            return top.myatob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNode', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            document.body.setAttributeNS('', 'onload', 'top.myatob = window[1].atob.bind(top);');
            ifr.setAttributeNode(document.body.getAttributeNode('onload').cloneNode())
            testdiv.appendChild(ifr);
            return top.myatob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that calls atob via onload setAttributeNodeNS', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            document.body.setAttributeNS('', 'onload', 'top.myatob = window[1].atob.bind(top);');
            ifr.setAttributeNodeNS(document.body.getAttributeNode('onload').cloneNode())
            testdiv.appendChild(ifr);
            return top.myatob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that calls atob via onload setNamedItem', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            document.body.setAttributeNS('', 'onload', 'top.myatob = window[1].atob.bind(top);');
            ifr.attributes.setNamedItem(document.body.getAttributeNode('onload').cloneNode())
            testdiv.appendChild(ifr);
            return top.myatob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that calls atob via onload setNamedItemNS', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const ifr = document.createElement('iframe');
            document.body.setAttributeNS('', 'onload', 'top.myatob = window[1].atob.bind(top);');
            ifr.attributes.setNamedItemNS(document.body.getAttributeNode('onload').cloneNode())
            testdiv.appendChild(ifr);
            return top.myatob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});