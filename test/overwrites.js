const setup = require('./index');

describe('test overrides of native functions', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.concat override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'concat', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.includes override attempt', async () => {
        const result = await browser.execute(function() {
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'includes', {value: () => []});
                testdiv.appendChild(ifr);
                if (top.bypass) top.bypass([ifr.contentWindow]);
                return ifr.contentWindow.atob('WA==');
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.push override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'push', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Array.prototype.slice override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(Array.prototype, 'slice', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Function.prototype.call override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                Object.defineProperty(Function.prototype, 'call', {value: () => []});
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Element.prototype.parentElement override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                Object.defineProperty(Element.prototype, 'parentElement', {value: document.createElement('div')});
                testdiv.innerHTML += '<iframe id="xxx"></iframe>';
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Function.prototype.apply override attempt', async () => {
        const result = await browser.execute(function() {
            {
                Object.defineProperty(Function.prototype, 'apply', {value: () => 1});
                testdiv.innerHTML += '<iframe id="xxx"></iframe>';
                if (top.bypass) top.bypass([xxx.contentWindow]);
                return xxx.contentWindow.atob('WA==');
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Element.prototype.getElementsByTagName override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                Object.defineProperty(Element.prototype, 'getElementsByTagName', {value: () => [document.head.firstChild]});
                testdiv.innerHTML += '<iframe id="xxx"></iframe>';
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.getOwnPropertyDescriptor override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                Object.defineProperty(Object, 'getOwnPropertyDescriptor', {value: 1});
                testdiv.innerHTML += '<iframe id="xxx"></iframe>';
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.getPrototypeOf override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                Object.defineProperty(Object, 'getPrototypeOf', {value: 1});
                testdiv.innerHTML += '<iframe id="xxx"></iframe>';
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via window.Error override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                Object.defineProperty(window, 'Error', {value: 1});
                testdiv.innerHTML += '<iframe id="xxx"></iframe>';
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that was under sabotage attempt via Object.defineProperty override attempt', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                Object.defineProperty(Object, 'defineProperty', {value: 1});
                testdiv.innerHTML += '<iframe id="xxx"></iframe>';
                bypass([xxx.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });
});