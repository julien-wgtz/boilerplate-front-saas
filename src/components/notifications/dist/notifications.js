"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var userStore_1 = require("@/stores/userStore");
var react_1 = require("react");
var socket_io_client_1 = require("socket.io-client");
var use_intl_1 = require("use-intl");
var lucide_react_1 = require("lucide-react");
var notifications_1 = require("@/services/notifications");
var notification_1 = require("./notification");
var notificationsStore_1 = require("@/stores/notificationsStore");
var use_toast_1 = require("@/hooks/use-toast");
var Notifications = function (_a) {
    var t = use_intl_1.useTranslations();
    var toast = use_toast_1.useToast().toast;
    var user = userStore_1["default"]().user;
    var _b = notificationsStore_1["default"](), notifications = _b.notifications, setNotifications = _b.setNotifications, addNotification = _b.addNotification;
    react_1.useEffect(function () {
        if (user == null && notifications == null)
            return;
        var socket = socket_io_client_1.io("https://localhost:3005", {
            query: { userId: user === null || user === void 0 ? void 0 : user.id }
        });
        socket.on("newNotification", function (notification) {
            toast({
                description: t("new_notif")
            });
            addNotification(notification);
        });
        fetchNotifications();
        return function () {
            socket.disconnect();
        };
    }, [user]);
    react_1.useEffect(function () {
        if (user == null && notifications == null)
            return;
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notifications]);
    var fetchNotifications = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            notifications_1["default"].getNotificationsFromUser().then(function (data) {
                var sortedData = data.sort(function (a, b) {
                    return new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime();
                });
                setNotifications(sortedData);
            });
            return [2 /*return*/];
        });
    }); };
    var handleClickOutside = function (event) {
        var sidebar = document.querySelector("#notification-sidebar");
        if (sidebar &&
            !sidebar.contains(event.target) &&
            sidebar.getAttribute("data-open") ===
                "true") {
            openNotificationSidebar();
        }
    };
    var openNotificationSidebar = function () {
        var sidebar = document.querySelector("#notification-sidebar");
        var isOpen = sidebar === null || sidebar === void 0 ? void 0 : sidebar.getAttribute("data-open");
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.setAttribute("data-open", isOpen == "true" ? "false" : "true");
        if (isOpen == "true") {
            notifications.forEach(function (notification) {
                if (notification.seen)
                    return;
                notifications_1["default"].markAsSeen(notification.id);
            });
            fetchNotifications();
        }
    };
    return (react_1["default"].createElement("div", { id: "notification-sidebar", "data-open": "false", className: "fixed z-10 w-[--sidebar-width] group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] h-full top-0 left-[--sidebar-width] min-h-screen max-h-screen overflow-y-scroll data-[open=false]:left-0 bg-sidebar border-l-[1px] data-[open=true]:border-r-[1px] border-r-sidebar-border border-l-sidebar-accent transition-all ease-linear" },
        react_1["default"].createElement("div", { className: "flex justify-between items-center p-4" },
            react_1["default"].createElement("h3", { className: "text-lg font-bold" }, t("notifications")),
            react_1["default"].createElement("div", { className: "cursor-pointer hover:bg-primary-700/50 bg-primary-700/50:hover rounded-full items-center justify-center rounded-md p-2  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>svg]:size-4" },
                react_1["default"].createElement(lucide_react_1.X, { className: "cursor-pointer", size: 16, onClick: openNotificationSidebar }))),
        react_1["default"].createElement("div", { className: "flex flex-col gap-2 p-2 pt-0" },
            notifications.length === 0 && (react_1["default"].createElement("div", { className: "flex justify-center items-center" },
                react_1["default"].createElement("p", { className: "text-muted-foreground text-sm" }, t("no_notifications")))), notifications === null || notifications === void 0 ? void 0 :
            notifications.map(function (notification) { return (react_1["default"].createElement(notification_1["default"], { key: notification.id, notification: notification, removeNotif: fetchNotifications })); }))));
};
exports["default"] = Notifications;
