const {setup} = require('./index');

describe('test overrides of native functions', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.concat override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'concat', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.includes override attempt', async function () {
        const result = await browser.execute(function() {
            return (function(){
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'includes', {value: () => []});
                testdiv.appendChild(ifr);
                if (top.bypass) top.bypass([ifr.contentWindow]);
                return ifr.contentWindow.atob('WA==');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.push override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'push', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.slice override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'slice', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Function.prototype.call override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                Object.defineProperty(Function.prototype, 'call', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Element.prototype.parentElement override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                Object.defineProperty(Element.prototype, 'parentElement', {value: document.createElement('div')});
                const ifr = document.createElement('iframe');
                ifr.id = 'xxx';
                document.body.appendChild(ifr);
                bypass([xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Function.prototype.apply override attempt', async function () {
        const result = await browser.execute(function() {
            return (function(){
                Object.defineProperty(Function.prototype, 'apply', {value: () => 1});
                const ifr = document.createElement('iframe');
                ifr.id = 'xxx';
                document.body.appendChild(ifr);
                if (top.bypass) top.bypass([xxx.contentWindow]);
                return xxx.contentWindow.atob('WA==');
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Element.prototype.getElementsByTagName override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                Object.defineProperty(Element.prototype, 'getElementsByTagName', {value: () => [document.head.firstChild]});
                const ifr = document.createElement('iframe');
                ifr.id = 'xxx';
                document.body.appendChild(ifr);
                bypass([xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.getOwnPropertyDescriptor override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                Object.defineProperty(Object, 'getOwnPropertyDescriptor', {value: 1});
                const ifr = document.createElement('iframe');
                ifr.id = 'xxx';
                document.body.appendChild(ifr);
                bypass([xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.getPrototypeOf override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                Object.defineProperty(Object, 'getPrototypeOf', {value: 1});
                const ifr = document.createElement('iframe');
                ifr.id = 'xxx';
                document.body.appendChild(ifr);
                bypass([xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via window.Error override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                Object.defineProperty(window, 'Error', {value: 1});
                const ifr = document.createElement('iframe');
                ifr.id = 'xxx';
                document.body.appendChild(ifr);
                bypass([xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.defineProperty override attempt', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                Object.defineProperty(Object, 'defineProperty', {value: 1});
                const ifr = document.createElement('iframe');
                ifr.id = 'xxx';
                document.body.appendChild(ifr);
                bypass([xxx.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via its contentWindow prop override attempt', async function () {
        // reference: https://github.com/LavaMoat/snow/pull/99
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                Object.defineProperty(ifr, 'contentWindow', {get: () => {
                        bypass([window[0]]);
                    }
                });
                document.body.appendChild(ifr);
                setTimeout(bypass, 200, [top]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe added by Range.prototype.insertNode', async function () {
		// reference: https://github.com/LavaMoat/snow/pull/112
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var range = document.createRange();
                var f = document.createElement("iframe");
                range.selectNode(document.getElementsByTagName("head")[0]);
                range.insertNode(f);
                bypass([f.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe after proto polluting getPrototypeOf', async function () {
        // reference: https://github.com/LavaMoat/snow/pull/146
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                var proxy = open('#asd', '_top');
                proxy.constructor.getPrototypeOf.call = () => null;
                var iframe = document.createElement('iframe');
                document.body.appendChild(iframe);
                bypass([iframe.contentWindow]);
            }());
        });
        expect(result).toBe('V');
    });
});