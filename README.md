# Let Glazier <img width=25 src="https://github.githubassets.com/images/icons/emoji/unicode/1fa9f.png"/> Install Your New Windows!

With `Glazier` you can register to the creation event of any newborn window in the webpage
and manipulate that window as you like before anyone else in the page has the chance to do so.

[Learn more about Glazier project, what it comes to solve and how](https://weizman.github.io/glazier-website/)

> ⚠️ Warning - Experimental ⚠️

[Simple DEMO](https://weizman.github.io/glazier-website/) - You're challenged to pop an alert in this page 😉

## *IMPORTANT NOTE*

It has been discovered that [`open` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) allows bypassing of Glazier in a way that is non trivial to patch.

This is fully described in [issue #2](https://github.com/weizman/glazier/issues/2), and until this issue is resolved, `open` API
is fully disabled by Glazier to prevent vulnerability. 

If your web app depends on `open` API, you cannot use Glazier, until this issue is resolved and a solution is rolled out (if not, Glazier is still right for you)

## usage

```javascript
// API
window.GLAZE(cb = (win) => {}, win = window);


// example, disable alert API in the webpage completely
window.GLAZE((win) => {
    win.alert = (msg) => {
        console.log('alert is disabled! msg is: ' + msg);
    };
});
```

## install

The latest `glazier` [production version](https://raw.githubusercontent.com/weizman/glazier/main/glazier.prod.js) is included in the official repo
and also in [upkg cdn](https://unpkg.com/glazier/glazier.prod.js), so in order to
install `glazier` in the website, simply place it wherever and serve it to the website as-is:

```html
<script src="https://unpkg.com/glazier/glazier.prod.js"></script>
```

After this line, window should expose `window.GLAZE` API for the
rest of the scripts in the website to use.

Not like standard third party libraries, `glazier` has special requirements (security-wise)
in order for it to play its role securely.

1. **It has to run as the first piece of javascript
   that runs in the webpage** - otherwise any other javascript code will have the ability to
   bypass `glazier` and cancel its purpose completely (that's why `glazier` can never overpower
   extensions). In order to achieve that, script tag must load script 
   synchronously (do not use `async=true`!).

2. **It must be served as-is** - If it goes through any bundlers that might change it,
   `glazier` may contain flaws that attackers might use to cancel its effect (for further
   explanation see [natives](https://weizman.github.io/glazier-website#natives) section below)


## Contribute

This project is an important POC aspiring to standardize how windows should be hermetically
hooked, however it is not yet production ready:

### Support

Currently `glazier` is written to support chromium based browsers only, it was
never tested on anything else.

### Performance

Achieving an hermetic solution costs in performance. Injecting this script into some major
websites went smoothly while with some others it caused them some performance issues.

### Security

Although this project takes the hermetic concept very seriously and massively tests for
potential flaws, `glazier` might potentially still have flaws which might enable attackers
to bypass its hooks.

Bottom line - `glazier` might have security vulnerabilities!

### Tests

In order to assure security, there are many tests that verify that `glazier`
is fully hermetic as promised - everything that `glazier` supports is fully tested.

The tests mainly try to bypass `glazier` in any possible way.

If you found a vulnerability in `glazier`, open a PR with a test that demonstrates it.

### Help

Help with promoting any of the topics above is very much appreciated in order for this project
to become production ready and reshape how hermetic window hooking should look like!

## Troubleshooting

Here are some important things to know about Glazier, and some problems you might have with it:

### html string iframes onload attributes

`onload` attributes of iframes that were created via html string
can be used to execute code that bypasses `glazier`:

```javascript
document.body.innerHTML = '<iframe onload=alert("BYPASS_GLAZIER")></iframe>'
```

At this point, it was decided that `glazier` drops those
listeners as protection because:

1. Hooking those listeners is not trivial and requires research.
2. After some research of major websites, no javascript that uses
this technique was found, not even once.

This might cause issues in your website if you're using this technique. If it does, rebuild Glazier with `WARN_OF_ONLOAD_ATTRIBUTES=true`, and reload the website.

If logs of found onload attributes appear, Glazier might
interrupt your website flow. If so, open an issue at:
[https://github.com/weizman/glazier/issues/new](https://github.com/weizman/glazier/issues/new?title=Glazier+disrupts+website+flow+when+removing+html+string+iframes+onload+attributes&body=Reproduce+by+running+glazier+on+%3CWEBSITE_URL%3E)
