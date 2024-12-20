"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var useNotificationsStore = zustand_1.create(middleware_1.persist(function (set, get) { return ({
    notifications: [],
    notificationsNotSeen: 0,
    setNotifications: function (notifications) {
        set({ notifications: notifications });
        var notSeen = notifications.filter(function (notif) { return !notif.seen; }).length;
        set({
            notificationsNotSeen: notSeen
        });
    },
    addNotification: function (notification) {
        set({
            notifications: __spreadArrays([
                notification
            ], get().notifications)
        });
        set({
            notificationsNotSeen: get().notificationsNotSeen + 1
        });
    }
}); }, {
    name: "notification-storage",
    storage: middleware_1.createJSONStorage(function () { return localStorage; })
}));
exports["default"] = useNotificationsStore;
