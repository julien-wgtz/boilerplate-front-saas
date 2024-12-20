"use strict";
exports.__esModule = true;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var useUserStore = zustand_1.create(middleware_1.persist(function (set, get) { return ({
    user: null,
    setUser: function (user) {
        set({ user: user, lang: user.language });
    },
    clearUser: function () { return set({ user: null }); },
    roleCurrentAccount: "",
    currentAccount: null,
    lang: "en",
    setCurrentAccount: function (currentAccount) {
        var role = currentAccount.users.find(function (u) { return u.userId === get().user.id; }).role;
        set({
            currentAccount: currentAccount,
            roleCurrentAccount: role
        });
    },
    clearCurrentAccount: function () {
        return set({ currentAccount: null });
    },
    logOut: function () {
        set({ user: null });
        set({ currentAccount: null });
    }
}); }, {
    name: "user-storage",
    storage: middleware_1.createJSONStorage(function () { return localStorage; })
}));
exports["default"] = useUserStore;
