const setup = require('./index');

describe('test custom elements', async () => {
    beforeEach(setup);

    // reference: https://github.com/LavaMoat/snow/issues/12

    it('should fail to use atob of an iframe that is loaded via a custom element with connectedCallback', async () => {
        if (global.BROWSER === 'SAFARI') {
            return; // extending iframes is not supported in safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
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

                customElements.define(`legit-element${n}`, NotFrame, {extends: 'iframe'});
                testdiv.appendChild(document.createElement('iframe', {is: `legit-element${n}`}));
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loaded via a custom element with connectedCallback through html', async () => {
        if (global.BROWSER === 'SAFARI') {
            return; // extending iframes is not supported in safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
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

                customElements.define(`legit-element${n}`, NotFrame, {extends: 'iframe'});
                testdiv.innerHTML = `<iframe is="legit-element${n}"></iframe>`;
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loaded via a custom element with attributeChangedCallback', async () => {
        if (global.BROWSER === 'SAFARI') {
            return; // extending iframes is not supported in safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                window.n = window.n ?? 0;
                window.n++;

                class NotFrame extends HTMLIFrameElement {
                    constructor() {
                        super()
                    }

                    static get observedAttributes() {
                        return ['src'];
                    }

                    attributeChangedCallback() {
                        bypass([this.contentWindow]);
                    }
                }

                customElements.define(`legit-element${n}`, NotFrame, {extends: 'iframe'});
                const ifr = document.createElement('iframe', {is: `legit-element${n}`});
                testdiv.appendChild(ifr);
                setTimeout(() => ifr.setAttribute('src', '/'), 100);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loaded via a custom element with adoptedCallback', async () => {
        if (global.BROWSER === 'SAFARI') {
            return; // extending iframes is not supported in safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                window.n = window.n ?? 0;
                window.n++;

                class NotFrame extends HTMLIFrameElement {
                    constructor() {
                        super()
                    }

                    adoptedCallback() {
                        bypass([this.contentWindow]);
                    }
                }

                const ifr2 = document.createElement('iframe');
                testdiv.appendChild(ifr2);
                customElements.define(`legit-element${n}`, NotFrame, {extends: 'iframe'});
                const ifr = document.createElement('iframe', {is: `legit-element${n}`});
                testdiv.appendChild(ifr);
                setTimeout(() => ifr2.contentDocument.body.appendChild(ifr), 100);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loaded via a custom element with adoptedCallback through html', async () => {
        if (global.BROWSER === 'SAFARI') {
            return; // extending iframes is not supported in safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                window.n = window.n ?? 0;
                window.n++;

                class NotFrame extends HTMLIFrameElement {
                    constructor() {
                        super()
                    }

                    adoptedCallback() {
                        bypass([this.contentWindow]);
                    }
                }

                const ifr2 = document.createElement('iframe');
                document.body.appendChild(ifr2);
                customElements.define(`legit-element${n}`, NotFrame, {extends: 'iframe'});
                testdiv.innerHTML = `<iframe id="xxx" is="legit-element${n}"></iframe>`
                setTimeout(() => ifr2.contentDocument.body.appendChild(xxx), 100);
            }());
        });
        expect(result).toBe('V');
    });
});