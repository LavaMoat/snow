const ERR_MARK_NEW_WINDOW_FAILED = 1;
const ERR_CB_MUST_BE_FUNCTION = 2;
const ERR_OPEN_JS_SCHEME_BLOCKED = 3;
const ERR_OPENED_PROP_ACCESS_BLOCKED = 4;
const ERR_DECLARATIVE_SHADOWS_BLOCKED = 5;
const ERR_EXTENDING_FRAMABLES_BLOCKED = 6;
const ERR_BLOB_TYPE_BLOCKED = 7;
const ERR_HTML_FRAMES_SRCDOC_BLOCKED = 8;
const ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED = 9;

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
        case ERR_BLOB_TYPE_BLOCKED:
            const object = a, kind = b, type = c;
            return err(generateErrorMessage(ERR_BLOB_TYPE_BLOCKED),
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
        case ERR_CB_MUST_BE_FUNCTION:
            const cb = a;
            return err(generateErrorMessage(ERR_CB_MUST_BE_FUNCTION),
                'first argument must be of type "function", instead got:', cb, '.',
                'therefore, snow bailed and is not applied to the page until this is fixed.',
            );
        case ERR_OPEN_JS_SCHEME_BLOCKED:
            const url = a, win2 = b;
            return err(generateErrorMessage(ERR_OPEN_JS_SCHEME_BLOCKED),
                'blocking open attempt to "javascript:" url:', url, 'by window: ', win2, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/44#issuecomment-1369687802', '.',
            );
        case ERR_OPENED_PROP_ACCESS_BLOCKED:
            const property = a, win3 = b;
            return err(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED),
                'blocking access to property:', `"${property}"`, 'of opened window: ', win3, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255', '.',
            );
        case ERR_DECLARATIVE_SHADOWS_BLOCKED:
            const html = a;
            return err(generateErrorMessage(ERR_DECLARATIVE_SHADOWS_BLOCKED),
                'blocking html string that includes a representation of a declarative shadow:', `"${html}"`, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328', '.',
            );
        case ERR_HTML_FRAMES_SRCDOC_BLOCKED:
            const html2 = a;
            return err(generateErrorMessage(ERR_HTML_FRAMES_SRCDOC_BLOCKED),
                'blocking html string that includes a representation of a framable element with the "srcdoc" attribute:',
                `"${html2}"`, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/???', '.',
            );
        case ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED:
            const document = a;
            return err(generateErrorMessage(ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED),
                'blocking document.write\\ln action on a document that is not the top most document:', document, '.',
                'if this prevents your application from running correctly, please visit/report at',
                'https://github.com/LavaMoat/snow/issues/???', '.',
            );
    }
}

module.exports = {
    error: e, generateErrorMessage,
    ERR_MARK_NEW_WINDOW_FAILED,
    ERR_OPENED_PROP_ACCESS_BLOCKED,
    ERR_OPEN_JS_SCHEME_BLOCKED,
    ERR_CB_MUST_BE_FUNCTION,
    ERR_DECLARATIVE_SHADOWS_BLOCKED,
    ERR_EXTENDING_FRAMABLES_BLOCKED,
    ERR_BLOB_TYPE_BLOCKED,
    ERR_HTML_FRAMES_SRCDOC_BLOCKED,
    ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED,
};
