const ERR_MARK_NEW_WINDOW_FAILED = 1;
const ERR_PROVIDED_CB_IS_NOT_A_FUNCTION = 2;
const ERR_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME = 3;
const ERR_OPEN_API_LIMITED = 4;
const ERR_DECLARATIVE_SHADOWS = 5;
const ERR_EXTENDING_FRAMABLES_BLOCKED = 6;
const ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN = 7;
const ERR_HTML_FRAMES = 8;
const ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN = 9;

const {Error} = globalThis;
const {from} = Array;
const error = Function.prototype.apply.bind(console.error, console);

function err(code) {
    const args = from(arguments);
    error(args);
    return new Error(code);
}

function generateErrorMessage(code) {
    return `SNOW ERROR (CODE:${code}):`;
}

function e(msg, a, b, c) {
    switch (msg) {
        case ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN:
            const object = a, kind = b, type = c;
            return err(generateErrorMessage(ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN),
                `blocking ${kind} object:`, object, `of type "${type}" (not in allow list)`, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/87#issuecomment-1586868353', '.',
            );
        case ERR_EXTENDING_FRAMABLES_BLOCKED:
            const name = a, options = b;
            return err(generateErrorMessage(ERR_EXTENDING_FRAMABLES_BLOCKED),
                `blocking extension attempt ("${name}") of framable elements such as provided`, options, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/56#issuecomment-1374899809', '.',
            );
        case ERR_MARK_NEW_WINDOW_FAILED:
            const win = a, exception = b;
            return err(generateErrorMessage(ERR_MARK_NEW_WINDOW_FAILED),
                'failed to mark new window:', win, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063', '.',
                'in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop', '.',
                'error caught:',
                exception,
            );
        case ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:
            const cb = a;
            return err(generateErrorMessage(ERR_PROVIDED_CB_IS_NOT_A_FUNCTION),
                'first argument must be of type "function", instead got:', cb, '.',
                'therefore, snow bailed and is not applied to the page until this is fixed.',
            );
        case ERR_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:
            const url = a, win2 = b;
            return err(generateErrorMessage(ERR_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME),
                'blocking open attempt to "javascript:" url:', url, 'by window: ', win2, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/44#issuecomment-1369687802', '.',
            );
        case ERR_OPEN_API_LIMITED:
            const property = a, win3 = b;
            return err(generateErrorMessage(ERR_OPEN_API_LIMITED),
                'blocking access to property:', `"${property}"`, 'of opened window: ', win3, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255', '.',
            );
        case ERR_DECLARATIVE_SHADOWS:
            const html = a;
            return err(generateErrorMessage(ERR_DECLARATIVE_SHADOWS),
                'blocking html string that includes a representation of a declarative shadow:', `"${html}"`, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328', '.',
            );
        case ERR_HTML_FRAMES:
            const html2 = a;
            return err(generateErrorMessage(ERR_HTML_FRAMES),
                'blocking html string that includes a representation of a framable element:', `"${html2}"`, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/???', '.',
            );
        case ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN:
            const document = a;
            return err(generateErrorMessage(ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN),
                'blocking document.write\\ln action on a document that is not the top most document:', document, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/???', '.',
            );
    }
}

module.exports = {
    error: e, generateErrorMessage,
    ERR_MARK_NEW_WINDOW_FAILED,
    ERR_OPEN_API_LIMITED,
    ERR_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME,
    ERR_PROVIDED_CB_IS_NOT_A_FUNCTION,
    ERR_DECLARATIVE_SHADOWS,
    ERR_EXTENDING_FRAMABLES_BLOCKED,
    ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN,
    ERR_HTML_FRAMES,
    ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN,
};
