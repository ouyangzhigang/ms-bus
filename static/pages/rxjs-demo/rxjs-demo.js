define("pages/rxjs-demo/rxjs-demo.ts",function(e){"use strict";function t(e){return console.log(e.toString()),i.toString()===e.toString()}e("node_modules/es5-shim/es5-shim"),e("node_modules/es6-promise/dist/es6-promise.auto"),e("node_modules/addeventlistener-with-dispatch/src/addeventlistener-with-dispatch");var n=e("node_modules/avalon2/dist/avalon");8===n.msie&&(Object.defineProperty=function(e,t,n){e[t]=n.value});var o=e("node_modules/rx/dist/rx.all");n.define({$id:"demo",text:"Click Me",click:function(){}});{var i=[38,38,40,40,37,39,37,39,66,65];o.Observable.fromEvent(document,"keyup").map(function(e){return e.keyCode}).bufferWithCount(10,1).filter(t).subscribeOnNext(function(){return console.log("KONAMI!")})}});