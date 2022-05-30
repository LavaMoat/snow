import onWin from "./src/index";

( function(win) { Object.defineProperty(win, 'GLAZE', { value: onWin }); }( window ) );