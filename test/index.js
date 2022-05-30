const fs = require('fs');
const path = require('path');

const glazier = fs.readFileSync(path.join(__dirname, '../glazier.prod.js')).toString();

module.exports = async function setup(injectGLAZIER = true) {
    await browser.url(`https://facebook.com/`);

    if (!injectGLAZIER) return;

    // inject GLAZIER
    await browser.execute(function(js) {
        const script = document.createElement('script');
        script.textContent = js;
        document.head.appendChild(script);
    }, glazier);

    // use GLAZIER to disable atob
    await browser.execute(function() {
        window.GLAZE((win) => {
            win.atob = function() {
                return 'ATOB_IS_DISABLED_IN_THIS_WINDOW_BY_GLAZIER';
            };
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