const fs = require('fs');
const path = require('path');

const snow = fs.readFileSync(path.join(__dirname, '../snow.prod.js')).toString();

module.exports = async function setup(injectSnow = true) {
    await browser.url(`https://example.com/`);

    if (!injectSnow) return;

    // inject SNOW
    await browser.execute(function(js) {
        const script = document.createElement('script');
        script.textContent = js;
        document.head.appendChild(script);
    }, snow);

    // use SNOW to disable atob
    await browser.execute(function() {
        window.SNOW((win) => {
            win.atob = _ => 'V';
        }, window);
    });

    // reset test divs
    await browser.execute(function() {
        const d = document.getElementById('testdiv');
        if (d) {
            d.remove();
        }
        document.getElementsByTagName('DIV')[0].innerHTML = '<div id="testdiv"><div id="testdiv1"></div><div id="testdiv2"></div></div>';
        window.testdiv = document.getElementById('testdiv');
        window.testdiv1 = document.getElementById('testdiv1');
        window.testdiv2 = document.getElementById('testdiv2');
    });
}