const setup = require('./index');

describe('test shadow DOM', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that is innerHTML attached as part of a shadow DOM', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const a = document.createElement('div');
            const s = a.attachShadow({mode:'open'});
            s.innerHTML = '<iframe></iframe>';
            testdiv.append(a);
            return s.firstChild.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that is DOM inserted as part of a shadow DOM', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const a = document.createElement('div');
            const s = a.attachShadow({mode:'open'});
            s.appendChild(document.createElement('iframe'));
            testdiv.append(a);
            return s.firstChild.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe load event that is DOM inserted as part of a shadow DOM', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const a = document.createElement('div');
            const s = a.attachShadow({mode:'open'});
            const ifr = document.createElement('iframe');
            ifr.addEventListener('load', () => {
                done(ifr.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
            });
            s.appendChild(ifr);
            testdiv.append(a);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe onload that is DOM inserted as part of a shadow DOM', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            const a = document.createElement('div');
            const s = a.attachShadow({mode:'open'});
            const ifr = document.createElement('iframe');
            ifr.onload = () => {
                done(ifr.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
            };
            s.appendChild(ifr);
            testdiv.append(a);
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that is innerHTML attached with onload attribute as part of a shadow DOM', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const a = document.createElement('div');
            const s = a.attachShadow({mode:'open'});
            s.innerHTML = '<iframe onload="top.myatob = this.contentWindow.atob.bind(top);"></iframe>';
            testdiv.append(a);
            return (top.myatob || atob)('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });

    it('should fail to use atob of an iframe that is attached to an already attached shadow DOM', async () => {
        const result = await browser.execute(function(debug) {
            if (debug) debugger;
            const a = document.createElement('div');
            const s = a.attachShadow({mode:'open'});
            testdiv.append(a);
            s.innerHTML = '<iframe onload="top.myatob = this.contentWindow.atob.bind(top);"></iframe>';
            return (top.myatob || atob)('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c=');
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});