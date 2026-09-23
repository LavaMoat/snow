// Experiment (not part of the regular suite): checks whether setting `srcdoc` on an
// already-connected iframe is synchronous or async relative to the child document's own execution,
// without SNOW involved at all. Used to investigate why re-navigating a connected iframe via
// srcdoc isn't reliably caught by SNOW (see test/html.js "(after)" cases).
//
// Run manually with:
//   ./node_modules/.bin/wdio run chrome.wdio.conf.js experiments/srcdoc-timing
//
// Result observed (Chrome 155, 2026-09-23): right after the `srcdoc` setter returns, `contentWindow`
// is still the SAME WindowProxy but its document is still the PREVIOUS one (readyState=complete,
// empty body, no marker set by the new content). This confirms the navigation triggered by `srcdoc`
// is fully asynchronous: there is no synchronous point after the setter call where the new document
// (and any inline <script> it contains) has already run, so nothing observed from the parent frame
// after the setter call can win the race against the child's own inline scripts.
describe('srcdoc re-navigation timing (no SNOW)', async function () {
    it('checks whether contentWindow identity/content changes synchronously after re-setting srcdoc', async function () {
        await browser.url('https://example.com/');
        const result = await browser.execute(function(done) {
            const log = [];
            const ifr = document.createElement('iframe');
            document.body.appendChild(ifr);
            const winBefore = ifr.contentWindow;
            log.push('initial contentWindow doc readyState=' + winBefore.document.readyState + ' href=' + winBefore.location.href);

            ifr.srcdoc = '<script>window.marker = "child-ran";</script>';
            const winAfterSync = ifr.contentWindow;
            log.push('same winProxy after set? ' + (winAfterSync === winBefore));
            log.push('sync after set: marker=' + winAfterSync.marker + ' readyState=' + winAfterSync.document.readyState + ' bodyHTML=' + JSON.stringify(winAfterSync.document.body && winAfterSync.document.body.innerHTML));
            return log;
        });
        console.log('LOG:\n' + result.join('\n'));
        expect(true).toBe(true);
    });
});
