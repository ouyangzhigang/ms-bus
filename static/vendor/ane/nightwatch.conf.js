define("vendor/ane/nightwatch.conf",function(e,n,r){"use strict";r.exports=function(e){return"win32"===process.platform&&(e.selenium.cli_args["webdriver.chrome.driver"]+=".exe"),e}(e("vendor/ane/nightwatch.json"))});