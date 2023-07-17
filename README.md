<div align="center">
    <h1> Snow JS ❄️ </h1>
    <i> ~ <b>S</b>ecuring <b>N</b>ested <b>O</b>wnership of <b>W</b>indows ~ </i>
    <br/><br/>
    <img src="https://img.shields.io/npm/v/@lavamoat/snow"/>
    <img src="https://img.shields.io/bundlephobia/min/@lavamoat/snow"/>
    <img src="https://badges.frapsoft.com/javascript/code/javascript.svg?v=101" width="113">
    <img src="https://img.shields.io/npm/dw/@lavamoat/snow"/>
    <img src="https://img.shields.io/github/license/lavamoat/snow"/>
    <br/><br/>
    <i> / Keeping an 👀 on these <code><iframe></code>s for ya! / </i>
    <br/><br/>
</div>

> _Snow is the **most advanced** open sourced tool for securing same origin realms in runtime browser apps - **secured** and **easy to use**:_

* Include Snow in your web app's loading html file (or by [requiring it as a module](#Install)):
```html
<script src="https://unpkg.com/@lavamoat/snow/snow.prod.js"></script>
```
* Pass Snow a callback and Snow will invoke it with **every** new window object in runtime!
```javascript
SNOW( win => console.log('New window detected:', win) )
```

<div align="center">
<img width="750" alt="❄️SNOW❄️" src="https://user-images.githubusercontent.com/13243797/219565727-12f00654-a709-4a39-87fc-5a60f643b308.png">
<br><br>
<i> Snow aspires to standardize how to recursively and <b> securely own newborn windows </b> (aka iframes/realms) <br> within a browser web app, 
<b> from the context of the app itself </b>. </i>
</div>

## About

Snow is an experimental ⚠️ tool coming in the form of a **JavaScript shim** that once is applied to the page exposes an API that when is 
provided with a callback, will make sure to call it with **every new window** that is being 
injected to DOM, **before** its creator gets a hold on it.

This ability exists for extensions (with the `all_frames: true` property), but `Snow` brings it
to **non extension javascript with the same privileges as the web app**.
    
> _Read more about Snow and the motivation behind it [here](https://github.com/lavamoat/snow/wiki/Introducing-Snow)_

## 🚨 IMPORTANT UPDATE 🚨

Starting Version [1.6.0](https://github.com/LavaMoat/snow/pull/76) Snow officially doesn't support vulnerabilities that
can be protected against by disallowing `unsafe-inline` & `unsafe-eval` and by specifying `object-src 'none'`.

To learn more why is that, see [section 3](#install).

## [Demo](https://lavamoat.github.io/snow/demo/#self-xss-challenge-msg) - The Snow Challenge! 🏆

<div align="center">
<img width="759" alt="Screenshot 2023-02-25 at 19 54 33" src="https://user-images.githubusercontent.com/13243797/221372185-eaeea815-b693-43bf-a371-6375ce8e0e8b.png">
</div>
<br>

Snow's challenge is the easiest way to **graspe the power of Snow.** 

Here we have a serverless [demo app](https://lavamoat.github.io/snow/demo/#self-xss-challenge-msg), which installs and **uses Snow to disable the functionality of the `alert` function** for all same origin realms.
    
In other words, the app uses Snow to make sure **no one can call the `alert` function**, not even when:
* Trying to create an `<iframe>` and use its inner window's `alert`;
* Trying to call the `alert` function from the console (even self-XSS won't help you!);
* Trying to open a new tab and use its `alert`.
    
Hence, the rulls are very simple - **visit the [app](https://lavamoat.github.io/snow/demo/) and pop an alert! 😉**
    
If you manage to bypass Snow and pop an alert message - **help us** by opening an issue so we could continue to **improve Snow's security**!
    
## Usage

```javascript
// API
SNOW(cb = (win) => { /* LOGIC */ });


// example, disable alert API in the webpage completely
SNOW((win) => {
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

3. **Most importantly, it's highly vulnerable without minimal help from CSP** - As of version 1.6.0 the project will
   seize to attempt to defend against vulnerabilities that aren't possible to exploit when 
   (a) `unsafe-inline` & `unsafe-eval` aren't allowed and (b) `object-src` isn't allowed.
   This is because (a) defending against string-JS attacks is basically an endless task and probably impossible, and
   (b) `object`/`embed` elements behaviour is also too unpredictable while these elements shouldn't be even used in the
   first place. Snow will do its best regardless of what CSP is applied - **use at your own risk!** (learn more at [#118](https://github.com/LavaMoat/snow/pull/118/))


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

`snow` supports Chrome, Firefox, Safari and all other Chromium based browsers (Opera, Edge, Brave, etc).

### Performance

Achieving a hermetic solution costs in performance. Injecting this script into some major
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
    
Part of the [LavaMoat 🌋](https://github.com/LavaMoat) Javascript security toolbox

Invented and developed by [Gal Weizman 👋🏻](https://weizmangal.com/)
