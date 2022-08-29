const setup = require('./index');

describe('test different views', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('iframe');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an frame', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const ifr = document.createElement('frame');
                testdiv.appendChild(ifr);
                bypass([ifr.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an object', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                testdiv1.innerHTML = ('<object id="temp_id" data="/" />');
                bypass([temp_id.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an embed', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                testdiv1.innerHTML = ('<embed id="temp_id" type="text/html" src="/">');
                if (window[0].frameElement !== temp_id) {
                    throw 'failed to obtain frame element real window';
                }
                bypass([window[0]]);
            }
        });
        expect(result).toBe('Y');
    });
});