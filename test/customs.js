const setup = require('./index');

describe('test custom elements', async () => {
    beforeEach(setup);

    // reference: https://github.com/LavaMoat/snow/issues/12

    it('should fail to use atob of an iframe that is loaded via onload attribute under a custom element', async () => {
        const result = await browser.executeAsync(function(debug, done) {
            if (debug) debugger;
            window.n = window.n ?? 0;
            window.n++;

            class NotFrame extends HTMLIFrameElement {
                constructor() {
                    super()
                }
                connectedCallback() {
                    done(this.contentWindow.atob('U05PV19JU19OT1RfRElTQUJMSU5HX0FUT0JfSU5fVEhJU19XSU5ET1c='));
                }
            }
            customElements.define(`legit-element${n}`, NotFrame, { extends: 'iframe' })
            document.body.appendChild(document.createElement('iframe', { is: `legit-element${n}` }));
        }, false); // change to 'true' in order to break on the beginning of this test in the browser
        expect(result).toBe('ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_SNOW');
    });
});