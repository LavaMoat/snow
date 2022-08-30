const setup = require('./index');

describe('test different iframe src', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe with src about:blank', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                ifr.src = 'about:blank';
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe with src javascript:', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                ifr.src = 'javascript:;';
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe with src javascript: via the javascript: (src then inject)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const rnd = Math.random().toString(36).substring(7);
                window[rnd] = bypass;
                const ifr = document.createElement('iframe');
                ifr.src = `javascript:top["${rnd}"]([this])`;
                testdiv.appendChild(ifr);
            }
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe with src javascript: via the javascript: (inject then src)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const rnd = Math.random().toString(36).substring(7);
                window[rnd] = bypass;
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                ifr.src = `javascript:top["${rnd}"]([this])`;
            }
        });
        expect(result).toBe('V');
    });
});