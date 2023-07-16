import snow from "./src/index";

( function(win) { Object.defineProperty(win, 'SNOW', { value: top.SNOW || snow }); }( window ) );