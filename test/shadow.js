const setup = require('./index');

describe('test shadow DOM', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe that is innerHTML attached as part of a shadow DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                s.innerHTML = '<iframe></iframe>';
                testdiv.append(a);
                bypass([s.firstChild.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is innerHTML attached as part of a shadow DOM inside another shadow DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                const d = document.createElement('div');
                s.appendChild(d);
                const s2 = d.attachShadow({mode: 'closed'});
                s2.innerHTML = '<iframe></iframe>';
                testdiv.append(a);
                bypass([s2.firstChild.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe attached as part of a shadow DOM inside another shadow DOM where both shadows belong to different realms', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                const ifr = document.body.appendChild(document.createElement('iframe'));
                const d = document.createElement('div');
                s.appendChild(d);
                const s2 = ifr.contentWindow.document.body.attachShadow.call(d, {mode: 'closed'});
                s2.innerHTML = `<iframe srcdoc="<iframe onload='top.bypass([this.contentWindow])'></iframe>"></iframe>`;
                testdiv.append(a);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is DOM inserted as part of a shadow DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                s.appendChild(document.createElement('iframe'));
                testdiv.append(a);
                bypass([s.firstChild.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe load event that is DOM inserted as part of a shadow DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                const ifr = document.createElement('iframe');
                ifr.addEventListener('load', () => {
                    bypass([ifr.contentWindow]);
                });
                s.appendChild(ifr);
                testdiv.append(a);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe onload that is DOM inserted as part of a shadow DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                const ifr = document.createElement('iframe');
                ifr.onload = () => {
                    bypass([ifr.contentWindow]);
                };
                s.appendChild(ifr);
                testdiv.append(a);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is innerHTML attached with onload attribute as part of a shadow DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                s.innerHTML = '<iframe id="xxx" onload="top.myatob = this.contentWindow.atob.bind(top); top.myalert = this.contentWindow.alert.bind(top);"></iframe>';
                testdiv.append(a);
                bypass([{atob: top.myatob || atob, alert: top.myalert || alert}]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is attached to an already attached shadow DOM', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'closed'});
                testdiv.append(a);
                s.innerHTML = '<iframe id="xxx" onload="top.myatob = this.contentWindow.atob.bind(top); top.myalert = this.contentWindow.alert.bind(top);"></iframe>';
                bypass([{atob: top.myatob || atob, alert: top.myalert || alert}]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is attached via declarative shadow DOM through srcdoc and javascript URI', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const f = document.createElement('iframe');
                f.srcdoc = `
                    <my-element>
                    <script>setTimeout(() => top.bypass([window]), 500)</script>
                    <template id="x" shadowroot="closed">
                    <iframe src="javascript:top.bypass([this.contentWindow])"></iframe>
                    </template>
                    </my-element>
                `;
                document.body.appendChild(f);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is attached via declarative shadow DOM through srcdoc', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const f = document.createElement('iframe');
                f.srcdoc = `
                    <my-element>
                    <script>setTimeout(() => top.bypass([window]), 500)</script>
                    <template id="x" shadowroot="closed">
                    <iframe onload="top.bypass([this.contentWindow])"></iframe>
                    </template>
                    </my-element>
                `;
                document.body.appendChild(f);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is attached via declarative shadow DOM through document.write', async function () {
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #58
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                document.write(`
                    <my-element>
                    <script>setTimeout(() => top.bypass([window]), 500)</script>
                    <template id="x" shadowroot="closed">
                    <iframe onload="top.bypass([this.contentWindow])"></iframe>
                    </template>
                    </my-element>
                `);
            }());
        });
        expect(result).toBe('V');
    });
});