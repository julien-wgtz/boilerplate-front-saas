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
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var account_1 = require("@/services/account");
var userStore_1 = require("@/stores/userStore");
var zod_1 = require("@hookform/resolvers/zod");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("zod");
var NewWorkspace = function () {
    var t = next_intl_1.useTranslations();
    var setCurrentAccount = userStore_1["default"]().setCurrentAccount;
    var _a = react_1.useState(false), openModal = _a[0], setOpenModal = _a[1];
    var formSchema = zod_2.z.object({
        workspaceName: zod_2.z
            .string({
            message: t("field_required")
        })
            .min(3, {
            message: t("field_min_length", {
                length: 3
            })
        })
    });
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: {
            workspaceName: ""
        }
    });
    var onSubmit = function (data) {
        account_1["default"].createAccount(data.workspaceName).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(res.status === 200)) return [3 /*break*/, 2];
                        return [4 /*yield*/, account_1["default"].getCurrentAccount()];
                    case 1:
                        account = _a.sent();
                        setCurrentAccount(account.data);
                        setOpenModal(false);
                        form.reset();
                        window.location.reload();
                        return [3 /*break*/, 3];
                    case 2:
                        form.setError("workspaceName", {
                            message: t("error_occurred")
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(dropdown_menu_1.DropdownMenuLabel, { onClick: function () { return setOpenModal(true); }, className: "p-0 font-normal cursor-pointer" },
            react_1["default"].createElement("div", { className: "flex items-center gap-2 p-2 " },
                react_1["default"].createElement("div", { className: "flex aspect-square size-6 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground" },
                    react_1["default"].createElement(lucide_react_1.Plus, { className: "size-3 text-primary" })),
                react_1["default"].createElement("div", { className: "flex w-full justify-between items-center w-full text-left text-sm leading-tight " },
                    react_1["default"].createElement("span", { className: "truncate font-thin\tmax-w-[10rem]" }, t("create_new_workspace"))))),
        react_1["default"].createElement(alert_dialog_1.AlertDialog, { open: openModal, onOpenChange: function (state) {
                return setOpenModal(state);
            } },
            react_1["default"].createElement(alert_dialog_1.AlertDialogContent, null,
                react_1["default"].createElement(alert_dialog_1.AlertDialogHeader, null,
                    react_1["default"].createElement(alert_dialog_1.AlertDialogTitle, { className: "text-primary" }, t("create_new_workspace")),
                    react_1["default"].createElement(alert_dialog_1.AlertDialogDescription, null, t("create_new_workspace_description"))),
                react_1["default"].createElement(form_1.Form, __assign({}, form),
                    react_1["default"].createElement("form", { onSubmit: form.handleSubmit(onSubmit) },
                        react_1["default"].createElement(form_1.FormField, { control: form.control, name: "workspaceName", render: function (_a) {
                                var field = _a.field;
                                return (react_1["default"].createElement(form_1.FormItem, null,
                                    react_1["default"].createElement(form_1.FormLabel, { className: "text-primary" }, t("write_workspace_name_to_create")),
                                    react_1["default"].createElement(input_1.Input, __assign({}, field, { className: "text-primary", autoComplete: "off" })),
                                    react_1["default"].createElement(form_1.FormMessage, null)));
                            } }))),
                react_1["default"].createElement(alert_dialog_1.AlertDialogFooter, null,
                    react_1["default"].createElement(alert_dialog_1.AlertDialogCancel, { className: "text-primary" }, t("cancel")),
                    react_1["default"].createElement(alert_dialog_1.AlertDialogAction, { onClick: form.handleSubmit(onSubmit) }, t("confirm")))))));
};
exports["default"] = NewWorkspace;
