const WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED = 1;
const ERR_MARK_NEW_WINDOW_FAILED = 2;
const WARN_OPEN_API_DISABLED = 3;

function warn(msg, a, b) {
    let bail;
    switch (msg) {
        case WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:
            const frame = a, onload = b;
            bail = false;
            console.warn('SNOW:',
                'removing html string iframe onload attribute:', frame, `"${onload}".`,
                '\nthis technique is less common under legitimate use, but can be used to attack snow and therefore is removed.',
                '\nif this harms your web app, open an issue at snow github repo.'
            );
            break;
        case WARN_OPEN_API_DISABLED:
            const args = a, win = b;
            bail = true;
            console.warn('SNOW:',
                'blocking open API call:', args, win,
                '\nlearn more about why open API is blocked by snow completely here:',
                'https://github.com/lavamoat/snow/issues/2'
            );
            break;
        default:
            break;
    }
    return bail;
}

function error(msg, a, b) {
    let bail;
    switch (msg) {
        case ERR_MARK_NEW_WINDOW_FAILED:
            const win = a, err = b;
            bail = true;
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
    return bail;
}

module.exports = {
    warn, error,
    WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED,
    ERR_MARK_NEW_WINDOW_FAILED,
    WARN_OPEN_API_DISABLED
};