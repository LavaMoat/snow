const setup = require('./index');

describe('test multiple callbacks provided', async function () {
    beforeEach(setup);

    it('should succeed to digest multiple callbacks and respect the one that commands to stop', async function () {
        const result = await browser.executeAsync(function(done) {
            (function(){
                let flag1, flag2, flag3, flag4;
                SNOW(() => {
                    // called
                    flag1 = true;
                    return false;
                });
                SNOW(() => {
                    // called
                    flag2 = true;
                    return false;
                });
                SNOW(() => {
                    // called
                    flag3 = true;
                    return true;  // stop
                });
                SNOW(() => {
                    // not called
                    flag4 = true;
                });
                done([flag1, flag2, flag3, flag4]);
            }());
        });
        expect(JSON.stringify(result)).toBe('[true,true,true,null]');
    });
});