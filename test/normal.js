const {setup, setupNoSnow} = require('./index');

describe('test without Snow', async function () {
    before(setupNoSnow);

    it('should succeed to use top.atob normally', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                bypass([top]);
            }());
        });
        expect(['X']).toContain(result);
    });
});

describe('test normal cases', async function () {
    beforeEach(setup);

    it('should fail to use top.atob normally', async function () {
        const result = await browser.executeAsync(function(done) {
            top.bypass = (wins) => top.TEST_UTILS.bypass(wins, done);
            (function(){
                bypass([top]);
            }());
        });
        expect(['V']).toContain(result);
    });
});