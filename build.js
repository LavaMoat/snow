import snow from "./src/index";

(function (win) { Object.defineProperty(win, 'SNOW', { value: function (cb) { snow(cb, win) } }) }(window));
