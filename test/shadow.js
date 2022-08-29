const setup = require('./index');

describe('test shadow DOM', async () => {
    beforeEach(setup);

    it('should fail to use atob of an iframe that is innerHTML attached as part of a shadow DOM', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'open'});
                s.innerHTML = '<iframe></iframe>';
                testdiv.append(a);
                bypass([s.firstChild.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that is DOM inserted as part of a shadow DOM', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'open'});
                s.appendChild(document.createElement('iframe'));
                testdiv.append(a);
                bypass([s.firstChild.contentWindow]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe load event that is DOM inserted as part of a shadow DOM', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'open'});
                const ifr = document.createElement('iframe');
                ifr.addEventListener('load', () => {
                    bypass([ifr.contentWindow]);
                });
                s.appendChild(ifr);
                testdiv.append(a);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe onload that is DOM inserted as part of a shadow DOM', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'open'});
                const ifr = document.createElement('iframe');
                ifr.onload = () => {
                    bypass([ifr.contentWindow]);
                };
                s.appendChild(ifr);
                testdiv.append(a);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that is innerHTML attached with onload attribute as part of a shadow DOM', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'open'});
                s.innerHTML = '<iframe id="xxx" onload="top.myatob = this.contentWindow.atob.bind(top); top.myalert = this.contentWindow.alert.bind(top);"></iframe>';
                testdiv.append(a);
                bypass([{atob: top.myatob || atob, alert: top.myalert || alert}]);
            }
        });
        expect(result).toBe('Y');
    });

    it('should fail to use atob of an iframe that is attached to an already attached shadow DOM', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => win.atob('WA==')).join(','));
            {
                const a = document.createElement('div');
                const s = a.attachShadow({mode: 'open'});
                testdiv.append(a);
                s.innerHTML = '<iframe id="xxx" onload="top.myatob = this.contentWindow.atob.bind(top); top.myalert = this.contentWindow.alert.bind(top);"></iframe>';
                bypass([{atob: top.myatob || atob, alert: top.myalert || alert}]);
            }
        });
        expect(result).toBe('Y');
    });
});