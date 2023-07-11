const {setup} = require('./index');

describe('window.documentPictureInPicture.requestWindow API', () => {
    beforeEach(setup);

    it('should fail to use atob of a window that was created via requestWindow API', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => sessionStorage.result_1 = sessionStorage.result_1 || result;
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                window.addEventListener('keydown', async () => {
                    const win = await documentPictureInPicture.requestWindow();
                    bypass([win]);
                });
            }());
        });
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        const result = await browser.execute(function() {
            return sessionStorage.result_1
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of a window that was created via requestWindow API and accessed via "window" property', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => sessionStorage.result_2 = sessionStorage.result_2 || result;
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                window.addEventListener('keydown', async () => {
                    await documentPictureInPicture.requestWindow();
                    const win = documentPictureInPicture.window;
                    bypass([win]);
                });
            }());
        });
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        const result = await browser.execute(function() {
            return sessionStorage.result_2
        });
        expect(['V']).toContain(result);
    });

    it('should fail to use atob of a window that was created via requestWindow API and accessed via "onenter" event', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => sessionStorage.result_3 = sessionStorage.result_3 || result;
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                window.addEventListener('keydown', async () => {
                    documentPictureInPicture.onenter = (e) => {
                        bypass(['', 'currentTarget', 'srcElement', 'target']
                            .sort(() => Math.random() - 0.5)
                            .map(a => a === '' ? e['window'] : e[a][window]));
                    };
                    await documentPictureInPicture.requestWindow();
                });
            }());
        });
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        const result = await browser.execute(function() {
            return sessionStorage.result_3
        });
        expect(['V,V,V,V']).toContain(result);
    });

    it('should fail to use atob of a window that was created via requestWindow API and reloaded to javascript scheme', async function () {
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            const done = (result) => sessionStorage.result_4 = sessionStorage.result_4 || result;
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                window.addEventListener('keydown', async () => {
                    const win = await documentPictureInPicture.requestWindow();
                    if (!win?.location?.href) {
                        bypass([win]);
                    }
                    win.location.href = 'javascript:opener.bypass([window])';
                });
            }());
        });
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        await browser.keys(["", "a"]);
        const result = await browser.execute(function() {
            return sessionStorage.result_4
        });
        expect(['V']).toContain(result);
    });
});