import snow from "./src/index";

(function(win) {
    const func = win === top ? snow : top.SNOW;
    Object.defineProperty(win, 'SNOW', {
        value: function(cb) {
            func(cb, win);
        }
    });
}(window));