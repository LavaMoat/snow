const setup = require('./index');

describe('test multiple callbacks provided', async function () {
    beforeEach(setup);

    it('should succeed to digest multiple callbacks and respect the one that commands to stop', async function () {
        const result = await browser.executeAsync(function(done) {
            (function(){
                let count = 0, flag1 = [], flag2 = [], flag3 = [], flag4 = [], flag5 = [];
                SNOW(() => {
                    flag1.push(++count);
                    return false;
                });
                SNOW(() => {
                    flag2.push(++count);
                    return false;
                });
                SNOW(() => {
                    flag3.push(++count);
                    return true;  // stop
                });
                SNOW(() => {
                    flag4.push(++count);
                    return true;
                });
                document.body.appendChild(document.createElement('iframe'));
                document.body.appendChild(document.createElement('iframe'));
                SNOW(() => {
                    flag5.push(++count);
                    return true;
                });
                document.body.appendChild(document.createElement('iframe'));
                done([flag1, flag2, flag3, flag4, flag5]);
            }());
        });
        expect(JSON.stringify(result)).toBe('[[1,5,8,12],[2,6,9,13],[3,7,10,14],[4],[11]]');
    });
});