const {setup} = require('./index');
const {generateErrorMessage, ERR_HTML_FRAMES_SRCDOC_BLOCKED} = require('../src/log');

describe('test listeners', async function () {
    beforeEach(setup);

    it('should fail to use atob of an iframe added load event listener', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                ifr.addEventListener('load', () => {
                    bypass([ifr.contentWindow]);
                });
                testdiv.appendChild(ifr);
            }());
        });
        expect(result).toBe('V');
    });

    it('should attach same load event listener only once', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                let count = 0;
                const cb = () => {
                    count += 1;
                };
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                testdiv.appendChild(ifr);
                setTimeout(() => done(count));
            }());
        });
        expect(result).toBe(global.BROWSER === 'FIREFOX' ? 0 : 1);
    });

    it('should successfully remove a load event listener', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                const cb = () => {
                    done('load event called');
                };
                ifr.addEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.removeEventListener('load', cb);
                ifr.addEventListener('load', cb);
                ifr.removeEventListener('load', cb);
                ifr.removeEventListener('load', cb);
                testdiv.appendChild(ifr);
                setTimeout(() => done('load event not called'));
            }());
        });
        expect(result).toBe('load event not called');
    });

    it('should successfully add a load event listener more than once when options are different', async function () {
        const result = await browser.executeAsync(function(done) {
            top.done = done;
            top.bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                const ifr = document.createElement('iframe');
                let count = 0;
                const cb = () => {
                    count += 1;
                };
                ifr.addEventListener('load', cb, true);
                ifr.addEventListener('load', cb, false);
                ifr.addEventListener('load', cb, {capture: true});
                ifr.addEventListener('load', cb, {capture: false});
                ifr.addEventListener('load', cb, {once: false});
                ifr.addEventListener('load', cb, {once: true});
                ifr.addEventListener('load', cb, {passive: false});
                ifr.addEventListener('load', cb, {passive: true});
                ifr.addEventListener('load', cb, {signal: new AbortController().signal});
                ifr.addEventListener('load', cb, {signal: new AbortController().signal});
                ifr.addEventListener('load', cb, {capture: true, once: true});
                ifr.addEventListener('load', cb, {capture: true, once: true, passive: true});
                testdiv.appendChild(ifr);
                setTimeout(() => done(count));
            }());
        });
        expect(result).toBe(global.BROWSER === 'FIREFOX' ? 0 : 2);
    });

    it('preserves the receiver and event for function listeners', async function () {
        const result = await browser.execute(function() {
            const target = document.createElement('img');
            const event = new Event('load');
            let correct = false;
            target.addEventListener('load', function(received) {
                correct = this === target && received === event;
            });
            target.dispatchEvent(event);
            return correct;
        });
        expect(result).toBe(true);
    });

    it('supports object listeners with the object as handleEvent receiver', async function () {
        const result = await browser.execute(function() {
            const target = document.createElement('img');
            let calls = 0;
            const handler = {
                handleEvent() {
                    calls += this === handler ? 1 : 100;
                },
            };
            target.addEventListener('load', handler);
            target.addEventListener('load', handler);
            target.dispatchEvent(new Event('load'));
            target.removeEventListener('load', handler);
            target.dispatchEvent(new Event('load'));
            return calls;
        });
        expect(result).toBe(1);
    });

    it('passes null and undefined listeners through without throwing', async function () {
        const result = await browser.execute(function() {
            const target = document.createElement('img');
            for (const handler of [null, undefined]) {
                target.addEventListener('load', handler);
                target.removeEventListener('load', handler);
            }
            return true;
        });
        expect(result).toBe(true);
    });

    it('preserves native rejection of primitive listeners', async function () {
        const result = await browser.execute(function() {
            const target = document.createElement('img');
            return [false, 0, 'listener', 0n, Symbol(), Symbol.for('listener')].every(handler =>
                ['addEventListener', 'removeEventListener'].every(method => {
                    try {
                        target[method]('load', handler);
                        return false;
                    } catch (error) {
                        return error instanceof TypeError;
                    }
                })
            );
        });
        expect(result).toBe(true);
    });

    it('preserves once and AbortSignal behavior', async function () {
        const result = await browser.execute(function() {
            const target = document.createElement('img');
            const controller = new AbortController();
            let onceCalls = 0;
            let signalCalls = 0;
            target.addEventListener('load', () => onceCalls++, {once: true});
            target.addEventListener('load', () => signalCalls++, {signal: controller.signal});
            target.dispatchEvent(new Event('load'));
            controller.abort();
            target.dispatchEvent(new Event('load'));
            return [onceCalls, signalCalls];
        });
        expect(result).toEqual([1, 1]);
    });


    it('does not retain detached targets through their bound load listeners', async function () {
        // Forced collection is only exposed through ChromeDriver's CDP bridge.
        if (global.BROWSER !== 'CHROME') {
            this.skip();
        }
        await browser.execute(function() {
            window.listenerCacheRefs = [];
            for (let i = 0; i < 30; i++) {
                const target = document.createElement('img');
                const handler = function() { return this.tagName; }.bind(target);
                target.addEventListener('load', handler);
                testdiv.appendChild(target);
                target.remove();
                window.listenerCacheRefs.push(new WeakRef(target), new WeakRef(handler));
            }
        });
        // Separate protocol calls ensure the WeakRefs' creation job has ended.
        await browser.sendCommand('HeapProfiler.collectGarbage', {});
        await browser.sendCommand('HeapProfiler.collectGarbage', {});
        const remaining = await browser.execute(function() {
            return window.listenerCacheRefs.filter(ref => ref.deref() !== undefined).length;
        });
        expect(remaining).toBe(0);
    });


    it('removes a shared listener from multiple targets', async function () {
        const result = await browser.execute(function() {
            const first = document.createElement('img');
            const second = document.createElement('img');
            let calls = 0;
            const handler = () => calls++;
            first.addEventListener('load', handler);
            second.addEventListener('load', handler);
            first.removeEventListener('load', handler);
            second.removeEventListener('load', handler);
            first.dispatchEvent(new Event('load'));
            second.dispatchEvent(new Event('load'));
            return calls;
        });
        expect(result).toBe(0);
    });

    it('removes both capture registrations of a shared listener', async function () {
        const result = await browser.execute(function() {
            const target = document.createElement('img');
            let calls = 0;
            const handler = () => calls++;
            target.addEventListener('load', handler, true);
            target.addEventListener('load', handler, false);
            target.removeEventListener('load', handler, true);
            target.removeEventListener('load', handler, false);
            target.dispatchEvent(new Event('load'));
            return calls;
        });
        expect(result).toBe(0);
    });

    it('preserves wrapper identity after a removal that matches no registration', async function () {
        const result = await browser.execute(function() {
            const target = document.createElement('img');
            let calls = 0;
            const handler = () => calls++;
            target.addEventListener('load', handler, true);
            target.removeEventListener('load', handler, false);
            target.addEventListener('load', handler, true);
            target.dispatchEvent(new Event('load'));
            target.removeEventListener('load', handler, true);
            target.dispatchEvent(new Event('load'));
            return calls;
        });
        expect(result).toBe(1);
    });

});