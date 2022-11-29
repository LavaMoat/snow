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
                'removing html string iframe onload attribute:', frame, `"${onload}"`, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328', '.',
            );
            break;
        case WARN_OPEN_API_DISABLED:
            const args = a, win = b;
            bail = false;
            console.warn('SNOW:',
                'blocking open API call:', args, win, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255', '.',
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
                'failed to mark new window:', win, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063', '.', '\n',
                'in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop', '.', '\n',
                'error caught:', '\n',
                err,
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