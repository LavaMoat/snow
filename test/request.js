const setup = require('./index');

describe('window.documentPictureInPicture.requestWindow API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via requestWindow API', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (async function(){
                if (!window?.documentPictureInPicture?.requestWindow) {
                    bypass([window]);
                }
                const win = await documentPictureInPicture.requestWindow();
                bypass([win]);
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via requestWindow API and reloaded to javascript scheme', async function () {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (async function(){
                if (!window?.documentPictureInPicture?.requestWindow) {
                    bypass([window]);
                }
                const win = await documentPictureInPicture.requestWindow();
                if (!win?.location?.href) {
                    bypass([win]);
                }
                win.location.href = 'javascript:opener.bypass([window])';
            }());
        });
        expect(result).toBe('V');
    });
});