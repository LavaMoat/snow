import snow from "./src/index";

(function(win) {
    Object.defineProperty(win, 'SNOW', {
        value: function(cb, w) {
            func(cb, w || win);
        }
    });

    let func = snow;
    if (win !== top) {
        func = top.SNOW;
        win.SNOW(() => {}, win);
    }
}(window));