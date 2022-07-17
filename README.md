# Snow ❄️

> **S**ecuring **N**ested **O**wnership of **W**indows

`Snow` aspires to standardize how to recursively own newborn windows within a browser webpage, 
from the context of the webpage itself.

By providing `Snow` a callback, it will make sure to call it with every new window that is being 
injected to DOM, before its creator gets a hold on it.

This ability exists for extensions (with the `all_frames: true` property), but `Snow` brings it
to non extension javascript with the same privileges as the website.

* [Test](https://weizman.github.io/snow/demo/) `Snow` for yourself with this live demo!
* [Learn](https://github.com/weizman/snow/wiki) more about the motivation behind `Snow`
* `Snow` is still experimental ⚠️ - your [help](#Contribute) is highly appreciated!


## *IMPORTANT NOTE*

It has been discovered that [`open` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) allows bypassing of Snow in a way that is non-trivial to patch.

This is fully described in [issue #2](https://github.com/weizman/snow/issues/2), and until this issue is resolved, `open` API
is fully disabled by Snow to prevent vulnerability. 

If your web app depends on `open` API, you cannot use Snow, until this issue is resolved and a solution is rolled out (if not, Snow is still right for you)

## Usage

```javascript
// API
window.SNOW(cb = (win) => {}, win = window);


// example, disable alert API in the webpage completely
window.SNOW((win) => {
    win.alert = (msg) => {
        console.log('alert is disabled! msg is: ' + msg);
    };
});
```

## Install

The latest `snow` [production version](https://raw.githubusercontent.com/weizman/snow/main/snow.prod.js) is included in the official repo
and also in [upkg cdn](https://unpkg.com/@weizman/snow/snow.prod.js), so in order to
install `snow` in the website, simply place it wherever and serve it to the website as-is:

```html
<script src="https://unpkg.com/@weizman/snow/snow.prod.js"></script>
```

After this line, window should expose `window.SNOW` API for the
rest of the scripts in the website to use.

Not like standard third party libraries, `snow` has special requirements (security-wise)
in order for it to play its role securely.

1. **It has to run as the first piece of javascript
   that runs in the webpage** - otherwise any other javascript code will have the ability to
   bypass `snow` and cancel its purpose completely (that's why `snow` can never overpower
   extensions). In order to achieve that, when loading via a script tag it must load script 
   synchronously (do not use `async=true`!).

2. **It's better to be served as-is** - If it goes through any bundlers that might change it,
   `snow` may contain flaws that attackers might use to cancel its effect (for further
   explanation see [natives](https://weizman.github.io/snow/wiki/#natives) section below)

`SNOW` API can also be required as part of a bundle instead of a script tag:

```
yarn add @weizman/snow
```

```javascript
const snow = require('@weizman/snow');
```

## Contribute

This project is an important POC aspiring to standardize how windows should be hermetically
hooked, however it is not yet production ready:

### Support

Currently `snow` is written to support chromium based browsers only, it was
never tested on anything else.

### Performance

Achieving an hermetic solution costs in performance. Injecting this script into some major
websites went smoothly while with some others it caused them some performance issues.

### Security

Although this project takes the hermetic concept very seriously and massively tests for
potential flaws, `snow` might potentially still have flaws which might enable attackers
to bypass its hooks.

Bottom line - `snow` might have security vulnerabilities!

### Tests

In order to assure security, there are many tests that verify that `snow`
is fully hermetic as promised - everything that `snow` supports is fully tested.

The tests mainly try to bypass `snow` in any possible way.

If you found a vulnerability in `snow`, open a PR with a test that demonstrates it.

### Help

Help with promoting any of the topics above is very much appreciated in order for this project
to become production ready and reshape how hermetic window hooking should look like!

## Troubleshooting

Here are some important things to know about Snow, and some problems you might have with it:

### html string iframes onload attributes

`onload` attributes of iframes that were created via html string
can be used to execute code that bypasses `snow`:

```javascript
document.body.innerHTML = '<iframe onload=alert("BYPASS_SNOW")></iframe>'
```

At this point, it was decided that `snow` drops those
listeners as protection because:

1. Hooking those listeners is not trivial and requires research.
2. After some research of major websites, no javascript that uses
this technique was found, not even once.

This might cause issues in your website if you're using this technique. 
If it does, rebuild Snow with `WARN_OF_ONLOAD_ATTRIBUTES=true`, and reload the website.

If logs of found onload attributes appear, Snow might
interrupt your website flow. If so, open an issue at:
[https://github.com/weizman/snow/issues/new](https://github.com/weizman/snow/issues/new?title=Snow+disrupts+website+flow+when+removing+html+string+iframes+onload+attributes&body=Reproduce+by+running+snow+on+%3CWEBSITE_URL%3E)

## Supporters

Funded by [Consensys 💙](https://github.com/consensys)

Maintained and developed by [MetaMask 🦊](https://github.com/MetaMask)

Invented and developed by [Gal Weizman 👋🏻](https://weizman.github.io/)

Runs on [Securely 🔒](https://github.com/weizman/securely)
