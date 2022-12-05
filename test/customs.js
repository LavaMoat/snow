const setup = require('./index');

describe('test custom elements', async () => {
    beforeEach(setup);

    // reference: https://github.com/LavaMoat/snow/issues/12

    it('should fail to use atob of an iframe that is loaded via onload attribute under a custom element', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            {
                window.n = window.n ?? 0;
                window.n++;

                class NotFrame extends HTMLIFrameElement {
                    constructor() {
                        super()
                    }

                    connectedCallback() {
                        bypass([this.contentWindow]);
                    }
                }

                customElements.define(`legit-element${n}`, NotFrame, {extends: 'iframe'})
                document.body.appendChild(document.createElement('iframe', {is: `legit-element${n}`}));
            }
        });
        expect(result).toBe('V');
    });
});