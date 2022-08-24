// shopee-web-bridge@1.0.0
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('shopee-web-bridge', ['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ShopeeWebBridge = {}));
})(this, (function (exports) { 'use strict';

    //
    // Polyfills for legacy environments
    //
    /*
     * Support Android 4.4.x
     */
    if (!ArrayBuffer.isView) {
        ArrayBuffer.isView = function (a) {
            return a !== null && typeof (a) === 'object' && a.buffer instanceof ArrayBuffer;
        };
    }
    // Define globalThis if not available.
    // https://github.com/colyseus/colyseus.js/issues/86
    if (typeof (globalThis) === "undefined" &&
        typeof (window) !== "undefined") {
        // @ts-ignore
        window['globalThis'] = window;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var OS;
    (function (OS) {
        OS["ANDROID"] = "android";
        OS["IOS"] = "ios";
        OS["OTHER"] = "other";
    })(OS || (OS = {}));
    var userAgentChecker = function () {
        var ua = navigator.userAgent || navigator.vendor;
        var isInApp = false;
        var os = OS.OTHER;
        if (/beeshop/i.test(ua) || /shopee/i.test(ua)) {
            isInApp = true;
        }
        if (isInApp) {
            if (/android/i.test(ua)) {
                os = OS.ANDROID;
            }
            else if (/iPad|iPhone|iPod/i.test(ua)) {
                os = OS.IOS;
            }
        }
        return { isInApp: isInApp, os: os };
    };
    var isOnMobileApp = function () { return userAgentChecker().isInApp; };
    var getAppPath = function (url) {
        var a = { paths: [{ webNav: { url: url } }] };
        var b = btoa(JSON.stringify(a));
        return "home?navRoute=" + encodeURIComponent(b);
    };

    var LoginRespStatus;
    (function (LoginRespStatus) {
        LoginRespStatus[LoginRespStatus["FAILED"] = 0] = "FAILED";
        LoginRespStatus[LoginRespStatus["SUCCESS"] = 1] = "SUCCESS";
        LoginRespStatus[LoginRespStatus["CANCELED"] = 2] = "CANCELED";
    })(LoginRespStatus || (LoginRespStatus = {}));

    var WILL_REAPPEAR_ID = "WILL_REAPPEAR_ID";
    var DID_DISAPPEAR_ID = "DID_DISAPPEAR_ID";
    var WILL_RESIGN_ACTIVE_ID = "WILL_RESIGN_ACTIVE_ID";
    var DID_ACTIVE_ID = "DID_ACTIVE_ID";
    var ShopeeWebBridgeClass = /** @class */ (function () {
        function ShopeeWebBridgeClass() {
            var _this = this;
            /**
             * Initialize web bridge;
             * @returns Returns boolean indicating the successful initialization
             */
            this.init = function () {
                var _a;
                if (isOnMobileApp() && cc.sys.isBrowser) {
                    (_a = _this.WebBridge) === null || _a === void 0 ? void 0 : _a.init();
                    return true;
                }
                return false;
            };
            this.login = function (options, callback) {
                var o = __assign(__assign({}, options), { redirectPath: getAppPath(options.redirectPath) });
                var cb = function (_a) {
                    var status = _a.status;
                    if (status === LoginRespStatus.SUCCESS) {
                        window.location.reload();
                    }
                };
                _this.callHandler("login", o, callback || cb);
            };
            this.configurePage = function (_a) {
                var _b = _a.title, title = _b === void 0 ? "" : _b, showNavbar = _a.showNavbar;
                if (!isOnMobileApp())
                    return;
                var config = {
                    /** Disable pull to reload */
                    disableReload: 1,
                    /** Disable bounce effect in iOS */
                    disableBounce: 1,
                };
                var navbarInvisibleConfig = {
                    isTransparent: showNavbar ? 0 : 1,
                    hideBackButton: showNavbar ? 0 : 1,
                };
                var navbar = __assign({ title: title }, navbarInvisibleConfig);
                _this.callHandler("configurePage", {
                    config: config,
                    navbar: navbar,
                });
            };
            this.navigateTo = function (url) {
                _this.callHandler("navigate", {
                    target: "_blank",
                    url: url,
                });
            };
            this.setScreenAutolock = function (isEnabled) {
                _this.callHandler("deviceScreenAutoLock", {
                    isEnabled: isEnabled,
                });
            };
            this.regApplicationWillResignActive = function (callback) {
                _this.registerHandler("applicationWillResignActive", callback, WILL_RESIGN_ACTIVE_ID);
            };
            this.unregApplicationWillResignActive = function () {
                _this.unregisterHandler("applicationWillResignActive", WILL_RESIGN_ACTIVE_ID);
            };
            this.regApplicationDidBecomeActive = function (callback) {
                _this.registerHandler("applicationDidBecomeActive", callback, DID_ACTIVE_ID);
            };
            this.unregApplicationDidBecomeActive = function () {
                _this.unregisterHandler("applicationDidBecomeActive", DID_ACTIVE_ID);
            };
            this.registerWillReappear = function (callback) {
                _this.registerHandler("viewWillReappear", callback, WILL_REAPPEAR_ID);
            };
            this.registerDidDisappear = function (callback) {
                _this.registerHandler("viewDidDisappear", callback, DID_DISAPPEAR_ID);
            };
            this.unregisterWillReappear = function () {
                _this.unregisterHandler("viewWillReappear", WILL_REAPPEAR_ID);
            };
            this.unregisterDidDisappear = function () {
                _this.unregisterHandler("viewDidDisappear", DID_DISAPPEAR_ID);
            };
        }
        Object.defineProperty(ShopeeWebBridgeClass.prototype, "WebBridge", {
            get: function () {
                return window.WebViewJavascriptBridge;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShopeeWebBridgeClass.prototype, "callHandler", {
            get: function () {
                var _a;
                return (_a = this.WebBridge) === null || _a === void 0 ? void 0 : _a.callHandler;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShopeeWebBridgeClass.prototype, "registerHandler", {
            get: function () {
                var _a;
                return (_a = this.WebBridge) === null || _a === void 0 ? void 0 : _a.registerHandler;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShopeeWebBridgeClass.prototype, "unregisterHandler", {
            get: function () {
                var _a;
                return (_a = this.WebBridge) === null || _a === void 0 ? void 0 : _a.unregisterHandler;
            },
            enumerable: false,
            configurable: true
        });
        return ShopeeWebBridgeClass;
    }());
    new ShopeeWebBridgeClass();

    var instance = new ShopeeWebBridgeClass();

    exports.instance = instance;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=shopeeWebBridge.js.map
