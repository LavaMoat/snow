const {console} = require('./natives');

const WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED = 1;
const ERR_MARK_NEW_WINDOW_FAILED = 2;
const WARN_OPEN_API_LIMITED = 3;
const WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME = 4;

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
        case WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:
            const url2 = a, win2 = b;
            bail = true;
            console.warn('SNOW:',
                bail ? '' : 'NOT',
                'blocking open attempt to "javascript:" url:', url2, 'by window: ', win2, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255', '.',
            );
            break;
        case WARN_OPEN_API_LIMITED:
            const property = a, win3 = b;
            bail = true;
            console.warn('SNOW:',
                'blocking access to property:', `"${property}"`, 'of opened window: ', win3, '.', '\n',
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
    WARN_OPEN_API_LIMITED,
    WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME,
};