<div align="center">
    <h1> Snow JS ❄️ </h1>
    <i> ~ <b>S</b>ecuring <b>N</b>ested <b>O</b>wnership of <b>W</b>indows ~ </i>
    <br><br>
    <img src="https://img.shields.io/npm/v/@lavamoat/snow"/>
    <img src="https://img.shields.io/bundlephobia/min/@lavamoat/snow"/>
    <img src="https://badges.frapsoft.com/javascript/code/javascript.svg?v=101" width="113">
    <img src="https://img.shields.io/npm/dw/@lavamoat/snow"/>
    <img src="https://img.shields.io/github/license/lavamoat/snow"/>
    <br><br>
</div>

Snow is the **most advanced** open sourced tool for securing same origin realms in the browser - super **secure**, super **easy to use**:

* Include Snow in your web app's loading html file
```html
<script src="https://unpkg.com/@lavamoat/snow/snow.prod.js"></script>
```
* Pass Snow a callback and Snow will invoke it with **every** new window object in runtime!
```javascript
SNOW( win => console.log('New window detected:', win) )
```

<div align="center">
<img width="1000" alt="❄️SNOW❄️" src="https://user-images.githubusercontent.com/13243797/219565727-12f00654-a709-4a39-87fc-5a60f643b308.png">
</div>


*`Snow` aspires to standardize how to recursively own newborn windows (aka iframes/realms) within a browser web app, 
from the context of the app itself, and ideally to achieve that goal as a browser builtin API in the future*

Until then, it comes in the form of a JavaScript shim that once applied to the page exposes an API that when is 
provided with a callback, will make sure to call it with every new window that is being 
injected to DOM, before its creator gets a hold on it.

This ability exists for extensions (with the `all_frames: true` property), but `Snow` brings it
to non extension javascript with the same privileges as the web app.

* [Test](https://lavamoat.github.io/snow/demo/) `Snow` for yourself with this live demo!
* [Learn](https://github.com/lavamoat/snow/wiki/Introducing-Snow) more about the motivation behind `Snow` and why it should be a browser builtin API
* `Snow` is still experimental ⚠️ - your [help](#contribute) is highly appreciated!

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

The latest `snow` [production version](https://raw.githubusercontent.com/lavamoat/snow/main/snow.prod.js) is included in the official repo
and also in [upkg cdn](https://unpkg.com/@lavamoat/snow/snow.prod.js), so in order to
install `snow` in the website, simply place it wherever and serve it to the website as-is:

```html
<script src="https://unpkg.com/@lavamoat/snow/snow.prod.js"></script>
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
   the modified version might contain flaws that attackers might use to cancel its effect (for further
   explanation see [natives](https://github.com/lavamoat/snow/wiki/Introducing-Snow#natives) section). 

`SNOW` API can also be required as part of a bundle instead of a script tag:

```
yarn add @lavamoat/snow
```

```javascript
const snow = require('@lavamoat/snow');
```

## Contribute

This project is an important POC aspiring to standardize how windows should be hermetically
handled, however it is not yet production ready.

`snow` eventually is a shim that comes to both demonstrate and utilize the API we wish to see builtin to browsers in the future. 
Until `snow` becomes a platform builtin API, we have to attempt to overcome several challenges that are significantly harder to do so in pure javascript:

### Support

`snow` should support Chrome, Firefox, Safari and all other Chromium based browsers (Opera, Edge, Brave, etc).

Although, when running on Firefox please pay attention to [issue-59](https://github.com/LavaMoat/snow/issues/59).

### Performance

Achieving an hermetic solution costs in performance. Injecting this script into some major
websites went smoothly while with some others it caused them some performance issues.

### Security

Although this project takes the hermetic concept very seriously and massively tests for
potential flaws, `snow` might potentially still have flaws which might enable attackers
to bypass its hooks.

Bottom line - `snow` might have security vulnerabilities!

Hopefully in the future `snow` will become a builtin API provided by the browser. 
Achieving that goal will allow security assurance - such functionality will be safer to implement 
on behalf of the browser rather than the web app.

### Tests

In order to assure security, there are many tests that verify that `snow`
is fully hermetic as promised - everything that `snow` supports is fully tested.

The tests mainly try to bypass `snow` in any possible way.

If you found a vulnerability in `snow`, open a PR with a test that demonstrates it (or just let us know, and we'll do it).

### Help

Help with promoting any of the topics above is very much appreciated in order for this project
to become production ready and reshape how hermetic window hooking should look like!

## Troubleshooting

In [log.js](https://github.com/LavaMoat/snow/blob/main/src/log.js) file you can find references
to issues you might encounter using snow. 
If you do, you should see an error/warning thrown to console in your application with a reference
to the relevant issue thread.

In each thread a discussion around the issue is being made in order to better solve it, so please
share your experience with the issue in order for us to solve it in the best way possible.

If you encounter an issue that is not being handled by snow correctly, please open a new one.

## Supporters

Funded by [Consensys 💙](https://github.com/consensys)

Maintained and developed by [MetaMask 🦊](https://github.com/MetaMask)

Invented and developed by [Gal Weizman 👋🏻](https://weizman.github.io/)
