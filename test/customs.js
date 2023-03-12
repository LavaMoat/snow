const setup = require('./index');

describe('test custom elements', async function () {
    beforeEach(setup);

    // reference: https://github.com/LavaMoat/snow/issues/12

    it('should fail to use atob of an iframe that is loaded via a custom element with connectedCallback', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

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
                const ifr = document.createElement('iframe', {is: `legit-element${n}`});
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loaded via a custom element with connectedCallback (with src)', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

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
                const ifr = document.createElement('iframe', {is: `legit-element${n}`});
                ifr.src = '/';
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an frame that is loaded via a custom element with connectedCallback', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

                window.n = window.n ?? 0;
                window.n++;

                class NotFrame extends HTMLFrameElement {
                    constructor() {
                        super()
                    }

                    connectedCallback() {
                        bypass([this.contentWindow]);
                    }
                }

                customElements.define(`legit-element${n}`, NotFrame, {extends: 'frame'});
                const ifr = document.createElement('frame', {is: `legit-element${n}`});
                ifr.src = '/';
                const set = document.createElement('frameset');
                set.appendChild(ifr);
                testdiv.appendChild(set);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an object that is loaded via a custom element with connectedCallback', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

                window.n = window.n ?? 0;
                window.n++;

                class NotFrame extends HTMLObjectElement {
                    constructor() {
                        super()
                    }

                    connectedCallback() {
                        bypass([this.contentWindow]);
                    }
                }

                customElements.define(`legit-element${n}`, NotFrame, {extends: 'object'});
                const object = document.createElement('object', {is: `legit-element${n}`});
                object.data = '/';
                testdiv.appendChild(object);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an embed that is loaded via a custom element with connectedCallback', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

                window.n = window.n ?? 0;
                window.n++;

                class NotFrame extends HTMLEmbedElement {
                    constructor() {
                        super()
                    }

                    connectedCallback() {
                        bypass([window[0]]);
                    }
                }

                customElements.define(`legit-element${n}`, NotFrame, {extends: 'embed'});
                const embed = document.createElement('embed', {is: `legit-element${n}`});
                embed.src = '/';
                testdiv.appendChild(embed);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loaded via a custom element with connectedCallback through html', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

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

    it('should fail to use atob of an iframe that is loaded via a custom element with attributeChangedCallback', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

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

    it('should fail to use atob of an iframe that is loaded via a custom element with adoptedCallback', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

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

    it('should fail to use atob of an iframe that is loaded via a custom element with adoptedCallback through html', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // extending iframes is not supported in Safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                setTimeout(bypass, 100, [window]);

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