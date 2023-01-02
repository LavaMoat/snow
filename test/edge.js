const setup = require('./index');

describe('special cases', () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was attached as cross origin and then redirected back to same origin', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.src = "https://x.com";
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

    it('should fail to use atob of an iframe that was attached as cross origin and then redirected back to same origin (complex)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.src = "https://x.com";
                testdiv.appendChild(ifr);
                const zzz = ifr.contentWindow;
                setTimeout(() => {
                    ifr.src = "about:blank";
                    setTimeout(() => {
                        ifr.src = "https://x.com";
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

    it('should fail to use atob of an embed that was cross origin and then same origin', async () => {
        if (global.BROWSER === 'SAFARI') {
            return; // redirecting EMBED by updating src does not work in safari
        }
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                testdiv1.innerHTML = ('<embed id="temp_id_1" type="text/html" src="/">');
                testdiv2.innerHTML = ('<embed id="temp_id_2" type="text/html" src="https://x.com">');
                setTimeout(() => {
                    temp_id_2.src = temp_id_1.src;
                    temp_id_1.src = 'https://x.com';
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

    it('should fail to use atob of an iframe that was reattached to dom', async () => {
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

    it('should fail to use atob of an iframe within an iframe within an iframe', async () => {
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

    it('should fail to use atob of an iframe that had its document written', async () => {
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

    it('should fail to use atob of an iframe that had its document written-ln', async () => {
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

    it('should fail to use atob of an iframe when all element in DOM changed their own toString behaviour', async () => {
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

    it('should fail to use atob of an iframe of javascript: URI created with srcdoc', async () => {
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

    it('should fail to use atob of an iframe of javascript: URI created with srcdoc with innerHTML', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                testdiv.innerHTML = ('<iframe srcdoc="<iframe src=\'javascript:top.bypass([window])\'</iframe>"></iframe>');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe of javascript: URI created with srcdoc with document.write', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                document.write('<iframe srcdoc="<iframe src=\'javascript:top.bypass([window])\'</iframe>"></iframe>');
            }());
        });
        expect(result).toBe('V');
    });
});