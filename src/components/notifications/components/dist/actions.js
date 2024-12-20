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
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
var notificationsType_1 = require("../../../../types/notificationsType");
var use_intl_1 = require("use-intl");
var notifications_1 = require("@/services/notifications");
var account_1 = require("@/services/account");
var users_1 = require("@/services/users");
var userStore_1 = require("@/stores/userStore");
var use_toast_1 = require("@/hooks/use-toast");
var Actions = function (_a) {
    var notification = _a.notification, removeNotif = _a.removeNotif;
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var setUser = userStore_1["default"]().setUser;
    var setReadNotification = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setIsLoading(true);
            notifications_1["default"].markAsRead(notification.id);
            removeNotif();
            setIsLoading(false);
            return [2 /*return*/];
        });
    }); };
    var declineInvite = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setReadNotification();
                    return [4 /*yield*/, account_1["default"].declineInvite(notification.accountId).then(function (res) {
                            if (res.status === 401) {
                                use_toast_1.toast({
                                    variant: "destructive",
                                    description: t("invitation_already_deleted")
                                });
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var acceptInvit = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    return [4 /*yield*/, account_1["default"].acceptInvite(notification.accountId).then(function (res) {
                            if (res.status === 401) {
                                use_toast_1.toast({
                                    variant: "destructive",
                                    description: t("invitation_already_deleted")
                                });
                            }
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, users_1["default"].me().then(function (data) {
                            setUser(data);
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, setReadNotification()];
                case 3:
                    _a.sent();
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var t = use_intl_1.useTranslations();
    return (react_1["default"].createElement("div", { className: "flex justify-end gap-2 pt-2" },
        notification.type ===
            notificationsType_1.NotificationType.INVITE && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(button_1.Button, { className: "bg-transparent", variant: "outline", size: "sm", onClick: declineInvite, disabled: isLoading }, t("decline")),
            react_1["default"].createElement(button_1.Button, { variant: "default", size: "sm", onClick: acceptInvit, disabled: isLoading }, t("accept")))),
        notification.type ===
            notificationsType_1.NotificationType.MESSAGE && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(button_1.Button, { variant: "default", size: "sm", onClick: setReadNotification, disabled: isLoading }, t("mark_as_read"))))));
};
exports["default"] = Actions;
