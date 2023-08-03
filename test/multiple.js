const {setup} = require('./index');
const {generateErrorMessage, ERR_HTML_FRAMES_SRCDOC_BLOCKED} = require('../src/log');

describe('test multiple callbacks provided', async function () {
    beforeEach(setup);

    it('should succeed to digest multiple callbacks and respect the one that commands to stop', async function () {
        const result = await browser.executeAsync(function(done) {
            (function(){
                let count = 0, a = [], b = [], c = [], d = [], e = [];
                SNOW(() => a.push(++count) && 0);
                SNOW(() => b.push(++count) && 0);
                SNOW(() => c.push(++count) && 1); // stop
                SNOW(() => d.push(++count) && 1);
                document.body.appendChild(document.createElement('iframe'));
                document.body.appendChild(document.createElement('iframe'));
                SNOW(() => e.push(++count) && 1);
                document.body.appendChild(document.createElement('iframe'));
                done([a, b, c, d, e]);
            }());
        });
        expect(JSON.stringify(result)).toBe('[[1,5,8,12],[2,6,9,13],[3,7,10,14],[4],[11]]');
    });
});