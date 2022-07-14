import onWin from "./src/index";

( function(win) { Object.defineProperty(win, 'SNOW', { value: onWin }); }( window ) );