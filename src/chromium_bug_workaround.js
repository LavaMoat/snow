/*

This crazy function is a workaround to support 'object' in this project
in chromium due to a bug that can be reproduced by running:

<script>
    document.body.innerHTML = ('<object id="wow" data="/" />');
    alert(window[0]); // undefined
    wow.contentWindow.frameElement;
    alert(window[0]); // [object Window]
</script>

Seems that in order for the object frame to appear in window.frames,
one must first try to access any property of it.

This for some reason registers it to the window.frames list, otherwise it won't be there.

UPDATE: doesn't have to be a direct prop access, could also be a less
vulnerable and less direct manipulation (see https://github.com/LavaMoat/snow/issues/98)

*/

const {Object} = require('./natives');

function workaroundChromiumBug(frame) {
    frame && Object.getOwnPropertyDescriptor(frame, '');
}

module.exports = workaroundChromiumBug;
