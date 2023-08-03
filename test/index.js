const fs = require('fs');
const path = require('path');

const CSP = !!parseInt(process.env.CSP);

global.CONFIG = {
    // Scenarios Snow can't protect against, and instead relies on 'unsafe-inline' to be forbidden
    SKIP_CSP_UNSAFE_INLINE_CHECKS: CSP,
    // Scenarios Snow can't protect against, and instead relies on 'object-src' to same-origin to be forbidden
    SKIP_CSP_OBJECT_SRC_CHECKS: CSP,
}

const snow = fs.readFileSync(path.join(__dirname, '../snow.prod.js')).toString();

async function setup(url = 'https://example.com/', noSnow) {
    await browser.url(url);

    if (noSnow) return;

    // intercept console.error to propagate errors to be caught by tests infra
    await browser.execute(function() {
        console.error = function (e) { top.done(e) };
    });

    // inject SNOW
    await browser.execute(new Function(snow));

    // use SNOW to disable atob
    await browser.execute(function() {
        window.SNOW((win) => {
            win.atob = _ => 'V';
        }, window);
    });

    // reset test divs
    await browser.execute(function() {
        document.getElementById('testdiv')?.remove();
        document.querySelector('BODY').innerHTML = '<div id="testdiv"><div id="testdiv1"></div><div id="testdiv2"></div></div>';
        window.testdiv = document.getElementById('testdiv');
        window.testdiv1 = document.getElementById('testdiv1');
        window.testdiv2 = document.getElementById('testdiv2');
    });
}

async function setupNoSnow(url) {
    return await setup(url, true);
}

module.exports = {
    setup,
    setupNoSnow,
}