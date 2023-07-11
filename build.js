import snow from "./src/index" ;

( function(win) { Object.defineProperty(win, 'SNOW', { value: snow }); }( top ) );
