"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var notificationsType_1 = require("../../../types/notificationsType");
var userStore_1 = require("@/stores/userStore");
var next_intl_1 = require("next-intl");
var actions_1 = require("./components/actions");
var Notification = function (_a) {
    var notification = _a.notification, removeNotif = _a.removeNotif;
    var t = next_intl_1.useTranslations();
    var lang = userStore_1["default"]().lang;
    var _b = react_1.useState(false), isVisible = _b[0], setIsVisible = _b[1];
    var _c = react_1.useState(""), messageNotif = _c[0], setMessageNotif = _c[1];
    var getTimeAgo = function (date) {
        var now = new Date();
        var past = new Date(date);
        var diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
        if (diffInSeconds < 60) {
            return t("just_now", {
                seconds: diffInSeconds.toString()
            });
        }
        else if (diffInSeconds < 3600) {
            var minutes = Math.floor(diffInSeconds / 60).toString();
            return t("minutes_ago", {
                minutes: minutes
            });
        }
        else if (diffInSeconds < 86400) {
            var hours = Math.floor(diffInSeconds / 3600).toString();
            return t("hours_ago", {
                hours: hours
            });
        }
        else {
            var days = Math.floor(diffInSeconds / 86400).toString();
            return t("days_ago", {
                days: days
            });
        }
    };
    var handleRemoveNotif = function () {
        setIsVisible(true);
        removeNotif();
    };
    react_1.useEffect(function () {
        if (notification.type ===
            notificationsType_1.NotificationType.INVITE) {
            setMessageNotif(t.markup("invite_workspace", {
                username: notification.data.userName,
                workspace: notification.data.accountName,
                important: function (chunks) {
                    return "<strong class=\"font-black\">" + chunks + "</strong>";
                }
            }));
        }
        else if (notification.type ===
            notificationsType_1.NotificationType.MESSAGE) {
            var _a = notification.data, message = _a.message, rest = __rest(_a, ["message"]);
            setMessageNotif(t.markup(message, __assign(__assign({}, rest), { important: function (chunks) {
                    return "<strong class=\"font-black capitalize\">" + chunks + "</strong>";
                } })));
        }
    }, [notification]);
    return (react_1["default"].createElement("div", { "data-seen": notification.seen, "data-visible": isVisible, className: "rounded-md p-2 border-[1px] border-secondary data-[seen=false]:bg-muted data-[visible=true]:hidden " },
        react_1["default"].createElement("div", { className: "flex gap-2 items-start" },
            react_1["default"].createElement("div", { className: "avatar min-h-8 min-w-8" },
                react_1["default"].createElement("img", { className: "rounded-full w-8 h-8 object-cover", src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "avatar" })),
            react_1["default"].createElement("div", { className: "flex flex-col w-full " },
                react_1["default"].createElement("p", { className: "text-xs mb-1", dangerouslySetInnerHTML: {
                        __html: messageNotif
                    } }),
                react_1["default"].createElement("div", { className: "w-full flex justify-between items-center" },
                    react_1["default"].createElement("p", { className: "text-xs text-muted-foreground" }, new Date(notification.createdAt).toLocaleString(lang, {
                        weekday: "long",
                        hour: "2-digit",
                        minute: "2-digit"
                    })),
                    react_1["default"].createElement("p", { className: "text-xs text-muted-foreground" }, getTimeAgo(notification.createdAt))))),
        react_1["default"].createElement(actions_1["default"], { notification: notification, removeNotif: handleRemoveNotif })));
};
exports["default"] = Notification;
