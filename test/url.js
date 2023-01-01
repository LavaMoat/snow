const setup = require('./index');

describe('test url', async () => {
    beforeEach(setup);

    // reference: https://github.com/LavaMoat/snow/issues/43

    it('should fail to use atob of an iframe that is loading a blob url', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const f = document.createElement('iframe');
                document.body.appendChild(f);
                f.src = URL.createObjectURL(new Blob(["<script>top.bypass([window])</script>"], {type: "text/html"}));
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loading a blob url', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const enc = new TextEncoder();
                const by = enc.encode("<script>top.bypass([window])</script>");
                const blob = new Blob([by], {type: 'text/html'});
                const url = URL.createObjectURL(blob);
                const ifr = document.createElement('iframe');
                document.body.append(ifr);
                ifr.src = url;
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loading a file url', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const f = document.createElement('iframe');
                document.body.appendChild(f);
                f.src = URL.createObjectURL(new File(["<script>top.bypass([window])</script>"], 'aaa.txt', {type: "text/html"}));
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loading a file url', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const enc = new TextEncoder();
                const by = enc.encode("<script>top.bypass([window])</script>");
                const file = new File([by], 'aaa.txt', {type: 'text/html'});
                const url = URL.createObjectURL(file);
                const ifr = document.createElement('iframe');
                document.body.append(ifr);
                ifr.src = url;
            }());
        });
        expect(result).toBe('V');
    });

    it('should fail to use atob of an iframe that is loading a file url (webkitURL)', async () => {
        const result = await browser.executeAsync(function(done) {
            const bypass = (wins) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));
            (function(){
                top.bypass = bypass;
                const enc = new TextEncoder();
                const by = enc.encode("<script>top.bypass([window])</script>");
                const file = new File([by], 'aaa.txt', {type: 'text/html'});
                const url = webkitURL.createObjectURL(file);
                const ifr = document.createElement('iframe');
                document.body.append(ifr);
                ifr.src = url;
            }());
        });
        expect(result).toBe('V');
    });
});