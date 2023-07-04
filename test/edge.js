const {setup} = require('./index');

describe('special cases', () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was attached as cross origin and then redirected back to same origin', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.src = "https://lavamoat.github.io/snow/test/index.html";
                testdiv.appendChild(ifr);
                const zzz = ifr.contentWindow;
                setTimeout(() => {
                    ifr.src = "about:blank";
                    setTimeout(() => {
                        bypass([zzz]);
                    }, 1000);
                }, 1000);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was attached as cross origin and then redirected back to same origin (complex)', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.src = "https://lavamoat.github.io/snow/test/index.html";
                testdiv.appendChild(ifr);
                const zzz = ifr.contentWindow;
                setTimeout(() => {
                    ifr.src = "about:blank";
                    setTimeout(() => {
                        ifr.src = "https://lavamoat.github.io/snow/test/index.html";
                        setTimeout(() => {
                            ifr.src = "about:blank";
                            setTimeout(() => {
                                bypass([zzz]);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an embed that was cross origin and then same origin', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // redirecting EMBED by updating src does not work in safari
        }
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #59
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const href = location.href;
                testdiv1.innerHTML = (`<embed id="temp_id_1" type="text/html" src="${href}">`);
                testdiv2.innerHTML = ('<embed id="temp_id_2" type="text/html" src="https://lavamoat.github.io/snow/test/index.html">');
                setTimeout(() => {
                    temp_id_2.src = temp_id_1.src;
                    temp_id_1.src = 'https://lavamoat.github.io/snow/test/index.html';
                    setTimeout(() => {
                        temp_id_1.src = temp_id_2.src;
                        setTimeout(() => {
                            bypass([window[0], window[1]]);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an object that was cross origin and then same origin', async function () {
        if (global.BROWSER === 'SAFARI') {
            this.skip(); // redirecting EMBED by updating src does not work in safari
        }
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #59
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = (`<object id="temp_id_1" type="text/html" data="${location.href}">`);
                testdiv2.innerHTML = ('<object id="temp_id_2" type="text/html" data="https://lavamoat.github.io/snow/test/index.html">');
                setTimeout(() => {
                    temp_id_2.data = temp_id_1.data;
                    temp_id_1.data = 'https://lavamoat.github.io/snow/test/index.html';
                    setTimeout(() => {
                        temp_id_1.data = temp_id_2.data;
                        setTimeout(() => {
                            bypass([window[0], window[1]]);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }());
        });
        expect(result).toBe('V,V');
    });

    it('should fail to use atob of an iframe that was reattached to dom', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                setTimeout(() => {
                    ifr.remove();
                    setTimeout(() => {
                        testdiv.appendChild(ifr);
                        bypass([ifr.contentWindow]);
                    });
                });
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe within an iframe within an iframe', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const rnd = Math.random().toString(36).substring(7);
                window[rnd] = bypass;
                const ifr = document.createElement('iframe');
                ifr.onload = () => {
                    const ifr2 = ifr.contentWindow.document.createElement('iframe');
                    ifr2.addEventListener('load', () => {
                        const ifr3 = ifr2.contentWindow.document.createElement('iframe');
                        ifr3.onload = () => {
                            top[rnd]([ifr3.contentWindow]);
                        };
                        ifr2.contentWindow.document.body.appendChild(ifr3);
                    });
                    ifr.contentWindow.document.body.appendChild(ifr2);
                };
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that had its document written', async function () {
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #58
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                ifr.contentDocument.write('<iframe id="xxx"></iframe>')
                bypass([ifr.contentWindow.xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that had its document written-ln', async function () {
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #58
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                ifr.contentDocument.writeln('<iframe id="xxx"></iframe>')
                bypass([ifr.contentWindow.xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe when all element in DOM changed their own toString behaviour', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/9
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const all = document.querySelectorAll('*');
                const fr = document.createElement('iframe');
                for (const node of [...all, fr]) {
                    Object.defineProperty(node, Symbol.toStringTag, {value: 'bypassResetOnload'});
                }
                fr.onload = () => {
                    bypass([fr.contentWindow]);
                };
                testdiv.appendChild(fr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe of javascript: URI created with srcdoc', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const f = document.createElement('iframe');
                f.srcdoc = '<iframe src="javasCript\:top.bypass([window])"></iframe>';
                testdiv.appendChild(f);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe of javascript: URI created with srcdoc with innerHTML', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv.innerHTML = ('<iframe srcdoc="<iframe src=\'javascript:top.bypass([window])\'</iframe>"></iframe>');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe of javascript: URI created with srcdoc with document.write', async function () {
        if (global.BROWSER === 'FIREFOX') {
            this.skip(); // requires a fix #58
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                document.write('<iframe srcdoc="<iframe src=\'javascript:top.bypass([window])\'</iframe>"></iframe>');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that pretends to be a trusted html', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/95
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var d = document.createElement('div')
                d.innerHTML = '<iframe id="f"></iframe>';
                var f = d.firstChild;
                d.toJSON = ()=>'asd';
                f.toJSON = ()=>'asd';
                document.documentElement.toJSON = ()=>'asd';
                document.body.appendChild(d);
                bypass([f.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe was injected with srcdoc with a defending meta csp tag and trusted types', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/90
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                setTimeout(bypass, 200, [window]);
                var d = document.createElement('div');
                testdiv.appendChild(d);
                d.innerHTML = `
  <iframe srcdoc="
    <meta http-equiv='Content-Security-pOlicy' content=&quot;require-trusted-types-for 'script';&quot;>. 
    <script>
      trustedTypes.createPolicy('default', { createHTML: s=>s, createScript: function (s) { return ''; } });
      setTimeout(()=>top.bypass([frames[0]]),100);
    </script>
  <iframe src=\'javascript:alert(1)\'</iframe>"></iframe>`
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe was injected with srcdoc with a defending meta csp tag with a nonce', async function () {
        // reference: https://github.com/LavaMoat/snow/issues/94
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                setTimeout(bypass, 200, [window]);
                var d = document.createElement('div');
                testdiv.appendChild(d);
                d.innerHTML = `
    <iframe
        srcdoc="
        <meta http-equiv='Content-SecuriTy-Policy' content=&quot;script-src 'nonce-pwnd' ;&quot;>
            <iframe src=&quot;javascript:haha&quot;>
            </iframe>
        <script nonce=&quot;pwnd&quot;>top.bypass([frames[0]]);</script>">
    </iframe>`
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that tricks the frames array with clobbering of id=n', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr1 = document.createElement('iframe');
                const ifr2 = document.createElement('iframe');
                document.body.appendChild(ifr1);
                const div = document.createElement('div');
                div.id = "0";
                div.window = div; // I am a `window` now
                setTimeout(() => { bypass([ifr2.contentWindow, ifr1.contentWindow, window]) }, 500);
                try { ifr1.contentWindow.document.body.appendChild(div); } catch {}
                try { document.body.appendChild(ifr2); } catch {}
            }());
        });
        expect(result).toBe('V,V,V');
    });
});