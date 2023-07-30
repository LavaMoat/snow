const ERR_MARK_NEW_WINDOW_FAILED = 1;
const WARN_OPEN_API_LIMITED = 2;
const WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME = 3;
const ERR_PROVIDED_CB_IS_NOT_A_FUNCTION = 4;
const WARN_DECLARATIVE_SHADOWS = 5;
const ERR_EXTENDING_FRAMABLES_BLOCKED = 6;
const ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN = 7;
const WARN_SRCDOC_WITH_CSP_BLOCKED = 8;

const {warn, error} = window.console;

function w(msg, a, b) {
    let bail;
    switch (msg) {
        case WARN_DECLARATIVE_SHADOWS:
            const html = a;
            bail = false;
            warn('SNOW:',
                'removing html string representing a declarative shadow:', '\n', `"${html}"`, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328', '.',
            );
            break;
        case WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:
            const url2 = a, win2 = b;
            bail = true;
            warn('SNOW:',
                bail ? '' : 'NOT',
                'blocking open attempt to "javascript:" url:', url2, 'by window: ', win2, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/44#issuecomment-1369687802', '.',
            );
            break;
        case WARN_OPEN_API_LIMITED:
            const property = a, win3 = b;
            bail = true;
            warn('SNOW:',
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

function e(msg, a, b, c) {
    let bail;
    switch (msg) {
        case ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN:
            const object2 = a, kind = b, type = c;
            bail = true;
            error('SNOW:',
                `${kind} object:`, object2, `of type "${type}" is not allowed and therefore is blocked`, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/87#issuecomment-1586868353', '.', '\n',
            );
            break;
        case ERR_EXTENDING_FRAMABLES_BLOCKED:
            const name = a, options = b;
            bail = true;
            error('SNOW:',
                `"${name}"`, 'extending attempt', 'of framable elements such as provided', options, 'is blocked to prevent bypass', '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/56#issuecomment-1374899809', '.', '\n',
            );
            break;
        case ERR_MARK_NEW_WINDOW_FAILED:
            const win = a, err = b;
            bail = true;
            error('SNOW:',
                'failed to mark new window:', win, '.', '\n',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063', '.', '\n',
                'in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop', '.', '\n',
                'error caught:', '\n',
                err,
            );
            break;
        case ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:
            const cb = a;
            bail = true;
            error('SNOW:',
                'first argument must be of type "function", instead got:', cb, '.', '\n',
                'therefore, snow bailed and is not applied to the page until this is fixed.',
            );
            break;
        default:
            break;
    }
    return bail;
}

module.exports = {
    warn: w, error: e,
    ERR_MARK_NEW_WINDOW_FAILED,
    WARN_OPEN_API_LIMITED,
    WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME,
    ERR_PROVIDED_CB_IS_NOT_A_FUNCTION,
    WARN_DECLARATIVE_SHADOWS,
    ERR_EXTENDING_FRAMABLES_BLOCKED,
    ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN,
    WARN_SRCDOC_WITH_CSP_BLOCKED,
};
