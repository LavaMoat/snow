function bypass(wins) {
    (wins || []).forEach(w => w.alert.call(top, 'snow bypass attempt'));
}

function run(js) {
    const b = new Blob([js], {type: 'text/javascript'});
    const u = URL.createObjectURL(b);
    const s = document.createElement('script');
    s.src = u;
    document.head.appendChild(s);
}

(function(){
    location.search.includes('disable') || SNOW((win) => {
        win.alert = (msg) => {
            console.log('Snow: ', 'alert API is disabled, message is printed to console instead: ', msg);
        }
    });

    ta.value = JSON.parse(localStorage.code_snow || '""') ||
        `
/*
attempts to bypass Snow after running:

SNOW((win) => {
    win.alert = (msg) => {
        console.log('Snow: ', 'alert API is disabled, message is printed to console instead: ', msg);
    }
});
*/

debugger;

// insertion bypass attempt
(function(){
    const ifr = document.createElement('iframe');
    document.head.appendChild(ifr);
    ifr.contentWindow.alert.call(top, 'alert bypass using insertion')
}());

// innerHTML bypass attempt
(function(){
    const a = document.createElement('a');
    a.innerHTML = '<iframe id="xxx"></iframe>';
    document.head.appendChild(a);
    a.firstChild.contentWindow.alert.call(top, 'alert bypass using innerHTML')
}());

// onload attribute bypass attempt
(function(){
    const ifr = document.createElement('iframe');
    ifr.onload = () => ifr.contentWindow.alert.call(top, 'alert bypass using onload attribute')
    document.head.appendChild(ifr);
}());

// onload listener bypass attempt
(function(){
    const ifr = document.createElement('iframe');
    ifr.addEventListener('load', () => ifr.contentWindow.alert.call(top, 'alert bypass using onload listener'))
    document.head.appendChild(ifr);
}());
        `;

    bt.addEventListener('click', () => {
        localStorage.code_snow = JSON.stringify(ta.value);
        run(ta.value);
    });

    window.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.code === 'Enter') {
            bt.click();
        }
    });
}());