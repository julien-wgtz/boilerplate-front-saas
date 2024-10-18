"use strict";
exports.__esModule = true;
var zustand_1 = require("zustand");
var useUserStore = zustand_1.create(function (set) { return ({
    user: null,
    setUser: function (user) { return set({ user: user }); },
    clearUser: function () { return set({ user: null }); }
}); });
exports["default"] = useUserStore;
