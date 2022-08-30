const WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED = 1;
const ERR_MARK_NEW_WINDOW_FAILED = 2;

function warn(msg, a, b) {
    switch (msg) {
        case WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:
            const frame = a, onload = b;
            console.warn('SNOW:',
                'removing html string iframe onload attribute:', frame, `"${onload}".`,
                '\nthis technique is less common under legitimate use, but can be used to attack snow and therefore is removed.',
                '\nif this harms your web app, open an issue at snow github repo.'
            );
            break;
        default:
            break;
    }
}

function error(msg, a, b) {
    switch (msg) {
        case ERR_MARK_NEW_WINDOW_FAILED:
            const win = a, err = b;
            console.error('SNOW:',
                'failed to mark new window:', win, '.',
                '\nthis is either a bug in snow or an attack attempt.',
                '\nthis typically causes an infinite loop until either one is solved.',
                '\nerror caught:\n', err,
            );
            break;
        default:
            break;
    }
}

module.exports = {
    warn, error,
    WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED,
    ERR_MARK_NEW_WINDOW_FAILED,
};