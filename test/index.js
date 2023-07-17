const fs = require('fs');
const path = require('path');

const CSP = 'script-src "self"; object-src "none";';
const URL = 'https://weizman.github.io/CSPer/';

const snow = fs.readFileSync(path.join(__dirname, '../snow.prod.js')).toString();

function getURL() {
    let url = URL;
    if (global.BROWSER === 'CHROME') {
        url += '?csp=' + CSP;
    }
    return url;
}

function setTestUtils(CSP) {
    function listener(e) {
        const fakeWin = {atob: () => 'CSP-' + (e.effectiveDirective || e.violatedDirective)};
        setTimeout(top.bypass, 500, [fakeWin]);
    }

    const top = window.top;
    const utils = top.TEST_UTILS = {CSP};

    utils.bypass = (wins, done) => done(wins.map(win => (win && win.atob ? win : top).atob('WA==')).join(','));

    utils.bailOnCorrectUnsafeCSP = function(done) {
        if (utils.CSP && !utils.CSP.includes('unsafe')) {
            done('CSP-script-src-elem');
            return true;
        }
        return false;
    };

    utils.alertOnCSPViolation = function(win) {
        win.addEventListener('securitypolicyviolation', listener);
        win.document.addEventListener('securitypolicyviolation', listener);
    };

    utils.alertOnCSPViolation(window);
}

async function setupChrome() {
    const puppeteerBrowser = await browser.getPuppeteer();
    await browser.call(async () => {
        const pages = await puppeteerBrowser.pages();
        const page = pages[0];
        await page.evaluateOnNewDocument(setTestUtils, CSP);
    })
}

async function setup(url = getURL(), noSnow) {
    await browser.url(url);

    await browser.execute(setTestUtils, CSP);

    if (noSnow) return;

    if (global.BROWSER === 'CHROME') {
        await setupChrome();
    }

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