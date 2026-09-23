# Handoff: srcdoc re-navigation marking fix (in progress, not verified)

Context dump for resuming this work later with no memory of the session. Written 2026-09-23.

## Where this started

Running the wdio test suite on current Chrome (v155) surfaced failures unrelated to any
regression in this repo — they're pre-existing gaps in SNOW's protections, not caused by the
Chrome upgrade (confirmed with the user).

Two bugs were found and triaged separately:

### 1. `test/customs.js` — FIXED, committed, verified passing (not part of this handoff)
Root cause was `customElements.hasOwnProperty('define') === true` on modern Chrome: the
`define` method is now an own property of the `customElements` instance, shadowing
`CustomElementRegistry.prototype.define`, which is all `src/customs.js` used to patch. Fixed
in `src/customs.js` `hookCustoms()` to detect and patch whichever object actually owns
`define`. Rebuilt and all 9 tests in `test/customs.js` pass. This part is done.

### 2. `test/html.js` — IN PROGRESS, this is what this doc is about
8 tests fail, in two unrelated groups:

**Group A — srcdoc re-navigation** (the one we're actively working on):
- `should fail to use atob of an iframe created by srcdoc (after)`
- `should fail to use atob of an iframe created by srcdoc as attribute (after)`
- `should fail to use atob of an iframe created by srcdoc with onload attribute of a nested iframe`
- `should fail to use atob of an iframe that was loaded via HTML in a new document (with srcdoc)`

Common trait: `srcdoc` is set/changed on an iframe **after** it's already connected to the DOM
(as opposed to the passing "(before)" variants, where `srcdoc` is set before `appendChild`).

**Group B — window opened via `<a target>` click / form `submit()`** (NOT started, separate
problem, see `https://github.com/LavaMoat/snow/issues/80` which the tests themselves
reference):
- `should fail to use atob of a window opened with an anchor element`
- `should fail to use atob of a window opened with a form element`

These create a new top-level window without ever calling `window.open()`, so `src/open.js`'s
hook (which only wraps the JS-callable `window.open`) never sees it. This needs a completely
different mechanism (something like polling/observing new browsing contexts, or intercepting
`opener` access) and hasn't been investigated yet. Don't conflate this with Group A.

## Group A diagnosis (confirmed experimentally)

Wrote `test/experiments/srcdoc-timing.js` (a standalone, SNOW-free wdio spec — NOT part of the
default test run since it lives in a subfolder the default glob `./test/*.js` doesn't match)
to check the timing of `srcdoc` re-navigation on an already-connected iframe. Run it with:
```
./node_modules/.bin/wdio run chrome.wdio.conf.js experiments/srcdoc-timing
```
**Note as of writing this doc: the user reverted my edits to that file back to an earlier
state (possibly overwritten with unrelated CI log paste content) — check its current contents
before relying on it. May need to be rewritten from scratch using the description below.**

Finding: right after `ifr.srcdoc = '...'` returns (on an already-connected iframe),
`ifr.contentWindow` is still the *same* WindowProxy but its `document` is still the *previous*
document (`readyState=complete`, empty body, no evidence of new content). This confirms the
navigation triggered by `srcdoc` is fully asynchronous — there is no synchronous point after
the setter call where the new document (and its inline `<script>`, which is what the test's
bypass relies on) has already run. So re-marking the window *after* the setter call (which is
what the existing `after()` hook in `src/inserters.js` does) can never win the race — by the
time any parent-side code could observe the new document, the child's own inline scripts have
already executed. Same applies to `load` event based re-hooking (registered in
`src/index.js` `onLoad`) — `load` fires only after the child document is fully done loading,
long after inline `<script>` tags already ran.

This differs from the "(before)" case (which already passes) because that one benefits from
the browser's "reuse the initial empty document's global object for the first navigation"
optimization — SNOW marks the initial about:blank window synchronously at `appendChild` time,
and because it's the very first navigation, the global object (and thus the marker) survives
into the real content. A *second* (or later) navigation on an already-active frame gets a truly
new global object, discarding the marker — hence "after" fails.

## Proposed fix (implemented in `src/inserters.js`, NOT YET VERIFIED — see below)

Since we can't win the race from the parent side after the fact, the fix makes the *browser's
own HTML parser* guarantee our code runs first: prepend a small inline bootstrap script to the
`srcdoc` HTML content before it's ever handed to the native setter:
```js
const SRCDOC_BOOTSTRAP = '<script>top.SNOW_WINDOW(window)</script>';
```
`top.SNOW_WINDOW` is SNOW's existing internal entry point (see `setSnowWindowUtil` /
`hookWin` in `src/index.js` and `src/hook.js`) that marks + fully hooks a window
synchronously. Because classic `<script>` tags execute in document order as the parser
encounters them, an injected script at the very start of the content is guaranteed to run
before any of the original/attacker content's own scripts — regardless of whether this is the
frame's first or a later navigation.

This needed **two** interception points, not just the existing `.srcdoc =` property setter
entry in the `map` in `src/inserters.js`:
1. `HTMLIFrameElement.prototype.srcdoc` setter (already had a `map` entry, just needed the
   content-rewriting behavior added).
2. `Element.prototype.setAttribute` — previously NOT intercepted at all. `setAttribute('srcdoc',
   ...)` bypasses the IDL property setter entirely, which is exactly why the "as attribute
   (after)" test was failing too. Added `'setAttribute'` to the `Element` map array, with logic
   in `getHook()` (in `src/inserters.js`) that only special-cases calls where the attribute
   name is literally `'srcdoc'` (case-insensitive) — all other `setAttribute` calls pass through
   untouched to the native method with no extra work.

The actual diff is in `src/inserters.js`: `getHook()` gained `isSrcdoc`/`isSrcdocAttr`
parameters, and the returned wrapper now prepends `SRCDOC_BOOTSTRAP` to the relevant string
argument before calling the native setter/method, when applicable.

## IMPORTANT — why the fix appeared not to work, and what to check first

After implementing the above and running `yarn build`, then re-running
`./node_modules/.bin/wdio run chrome.wdio.conf.js html`, the Group A tests were **still
failing**, now returning `"X,X"`/`"X"` (real unblocked atob) instead of the earlier failure
mode. This looked like the fix didn't work — **but before concluding that, notice**:

`package.json`'s `build` script is:
```json
"build": "yarn build-prod & yarn build-dev",
```
The `&` backgrounds `build-prod` and does **not** wait for it — `yarn build` returns as soon as
the foregrounded `build-dev` finishes, with no guarantee `build-prod` (which produces
`snow.prod.js`, the file `test/index.js` actually injects into the browser for all tests) has
finished or even started successfully by that point. When this was checked with
`git diff --stat`, **`snow.prod.js` showed NO diff at all** after running `yarn build`, while
`snow.js` did — strongly suggesting the test run that "showed the fix didn't work" was
actually still running against the **old, pre-fix** `snow.prod.js`.

**First thing to do when resuming this**: run `yarn build-prod` directly (not `yarn build`),
confirm the fix landed with e.g. `grep -c SNOW_WINDOW.window. snow.prod.js` (should be >0,
was 0 before), *then* re-run `./node_modules/.bin/wdio run chrome.wdio.conf.js html` and see
whether Group A actually passes now. The fix in `src/inserters.js` has never been properly
exercised against a fresh prod build yet.

## Repo state at time of writing this doc

Uncommitted/untracked (verify with `git status` — this may already be stale):
- `src/inserters.js` — modified, contains the srcdoc bootstrap fix described above (implemented,
  unverified).
- `snow.js` — rebuilt (dev bundle only), contains the fix.
- `snow.prod.js` — **NOT rebuilt**, still old. Needs `yarn build-prod`.
- `.github/workflows/main.yml` — modified by the user, unrelated to this work, not touched by me.
- `test/experiments/` — new folder, untracked. Contains `srcdoc-timing.js`
  (see caveat above — user reverted my edits, contents unknown/unreliable, may need rewriting).
- `test/_srcdoc.js` — stray untracked duplicate of the experiment, in the old location
  (would be picked up by the default `./test/*.js` glob if left there — should be deleted once
  `test/experiments/srcdoc-timing.js` is confirmed good, to avoid it running as part of the
  normal suite).

## Next steps, in order

1. `git status` / `git diff src/inserters.js` to confirm the fix described above is still there.
2. Run `yarn build-prod` explicitly (don't rely on `yarn build`). Verify `snow.prod.js` actually
   changed (`git diff --stat -- snow.prod.js` or grep for `SNOW_WINDOW`).
3. Re-run `./node_modules/.bin/wdio run chrome.wdio.conf.js html` and check whether the 4 Group A
   tests now pass.
4. If they pass: also run the *full* suite (`yarn test-chrome` or similar) to check for
   regressions from the new `Element.prototype.setAttribute` wrapper (it now intercepts every
   `setAttribute` call on every element, site-wide, even though it's a no-op passthrough for
   non-`srcdoc` names — worth confirming this doesn't slow anything down or break edge cases
   like `setAttribute` called with non-string / weird args, e.g. Symbols, which would throw in
   `stringToLowerCase(args[0]+'')`).
5. If they still fail even against a fresh prod build, re-verify the "prepended script runs
   first" assumption directly (e.g. does Chrome's srcdoc parser actually treat the prepended
   `<script>` as the very first parsed node, or does something about how `srcdoc` HTML documents
   are parsed change ordering/timing versus a normal document write — this wasn't independently
   re-confirmed after the code change, only reasoned about).
6. Delete `test/_srcdoc.js` (stray duplicate) once `test/experiments/srcdoc-timing.js` is in a
   known-good state.
7. Once Group A is solid, decide whether to tackle Group B (anchor/form window-open bypass,
   issue #80) as a separate, unrelated piece of work.
8. Consider also documenting the `yarn build` script's `&`/race-condition footgun somewhere
   (e.g. fix the script to use `&&` or `concurrently`/`wait`, or at minimum note it in repo docs)
   since it can silently cause exactly this kind of "my fix isn't working" false signal.
