const setup = require('./index');

describe('window.documentPictureInPicture.requestWindow API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via requestWindow API', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => top.result = result;
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                document.addEventListener('keydown', async () => {
                    const win = await documentPictureInPicture.requestWindow();
                    bypass([win]);
                });
            }());
        });
        await browser.keys(['Enter']);
        const result = await browser.execute(function() {
            return top.result
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via requestWindow API and accessed via "window" property', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => top.result = result;
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                document.addEventListener('keydown', async () => {
                    await documentPictureInPicture.requestWindow();
                    const win = documentPictureInPicture.window;
                    bypass([win]);
                });
            }());
        });
        await browser.keys(['Enter']);
        const result = await browser.execute(function() {
            return top.result
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of a window that was created via requestWindow API and accessed via "onenter" event', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => top.result = result;
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                document.addEventListener('keydown', async () => {
                    documentPictureInPicture.onenter = (e) => {
                        bypass(['', 'currentTarget', 'srcElement', 'target']
                            .sort(() => Math.random() - 0.5)
                            .map(a => a === '' ? e['window'] : e[a][window]));
                    };
                    await documentPictureInPicture.requestWindow();
                });
            }());
        });
        await browser.keys(['Enter']);
        const result = await browser.execute(function() {
            return top.result
        });
        expect(result).toBe('V,V,V,V');
    });

    it('should fail to use atob of a window that was created via requestWindow API and reloaded to javascript scheme', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => top.result = result;
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                document.addEventListener('keydown', async () => {
                    const win = await documentPictureInPicture.requestWindow();
                    if (!win?.location?.href) {
                        bypass([win]);
                    }
                    win.location.href = 'javascript:opener.bypass([window])';
                });
            }());
        });
        await browser.keys(['Enter']);
        const result = await browser.execute(function() {
            return top.result
        });
        expect(result).toBe('V');
    });
});