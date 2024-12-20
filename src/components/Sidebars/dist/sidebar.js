"use client";
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
exports.SidebarSaas = void 0;
var lucide_react_1 = require("lucide-react");
var breadcrumb_1 = require("@/components/ui/breadcrumb");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var separator_1 = require("@/components/ui/separator");
var sidebar_1 = require("@/components/ui/sidebar");
var react_1 = require("react");
var users_1 = require("@/services/users");
var userStore_1 = require("@/stores/userStore");
var skeleton_1 = require("@/components/ui/skeleton");
var next_intl_1 = require("next-intl");
var navigation_1 = require("next/navigation");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var link_1 = require("next/link");
var react_icons_1 = require("@radix-ui/react-icons");
var notificationsStore_1 = require("@/stores/notificationsStore");
var account_1 = require("@/services/account");
var new_workspace_1 = require("./components/new-workspace");
var avatarViewer_1 = require("../avatars/avatarViewer");
function SidebarSaas(_a) {
    var _this = this;
    var children = _a.children, lang = _a.lang, userFetch = _a.userFetch, accountFetch = _a.accountFetch;
    var t = next_intl_1.useTranslations();
    var router = navigation_1.useRouter();
    var _b = userStore_1["default"](), user = _b.user, currentAccount = _b.currentAccount, setUser = _b.setUser, setCurrentAccount = _b.setCurrentAccount, logOut = _b.logOut;
    var notificationsNotSeen = notificationsStore_1["default"]().notificationsNotSeen;
    var pathname = navigation_1.usePathname();
    var _c = react_1.useState([]), pathElement = _c[0], setPathElement = _c[1];
    var _d = react_1.useState([]), accountValid = _d[0], setAccountValid = _d[1];
    var handleLogOut = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_1["default"].logout()];
                case 1:
                    _a.sent();
                    logOut();
                    window.location.href = "/" + lang + "/signin";
                    return [2 /*return*/];
            }
        });
    }); };
    var changeCurrentAccount = function (index) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setCurrentAccount(user.accounts[index].account);
                    return [4 /*yield*/, users_1["default"].changeCurrentAccount(user.accounts[index].account.id).then(function (response) {
                            setUser(response.data);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var openNotificationSidebar = function () {
        var sidebar = document.querySelector("#notification-sidebar");
        var isOpen = sidebar === null || sidebar === void 0 ? void 0 : sidebar.getAttribute("data-open");
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.setAttribute("data-open", isOpen == "true" ? "false" : "true");
    };
    react_1.useEffect(function () {
        setUser(userFetch);
        account_1["default"].getCurrentAccount().then(function (act) {
            setCurrentAccount(act.data);
        });
    }, [userFetch, notificationsNotSeen]);
    react_1.useEffect(function () {
        var _a, _b;
        if (user) {
            if (user.theme == "light") {
                document.body.classList.remove("dark");
                (_a = document
                    .querySelector("main")) === null || _a === void 0 ? void 0 : _a.classList.remove("dark");
            }
            else {
                document.body.classList.remove("light");
                (_b = document
                    .querySelector("main")) === null || _b === void 0 ? void 0 : _b.classList.remove("light");
            }
            document.body.classList.add(user.theme);
            setAccountValid(user.accounts.filter(function (item) { return item.role !== "INVITED"; }));
        }
    }, [user]);
    react_1.useEffect(function () {
        var url = window.location.href;
        var urlObj = new URL(url);
        var path = urlObj.pathname;
        var pathArray = path
            .split("/")
            .filter(Boolean)
            .slice(1);
        setPathElement(pathArray);
    }, [pathname]);
    var getPath = function (index) {
        var path = "/" + lang + "/";
        for (var i = 0; i <= index; i++) {
            path += pathElement[i] + "/";
        }
        return path;
    };
    return (React.createElement(sidebar_1.SidebarProvider, { className: "relative" },
        React.createElement(sidebar_1.Sidebar, { variant: "inset", className: "bg-sidebar" },
            React.createElement(sidebar_1.SidebarHeader, null,
                React.createElement(sidebar_1.SidebarMenu, null, currentAccount ? (React.createElement(sidebar_1.SidebarMenuItem, null,
                    React.createElement(sidebar_1.SidebarMenuButton, { size: "lg", asChild: true },
                        React.createElement(dropdown_menu_1.DropdownMenu, null,
                            React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                                React.createElement(sidebar_1.SidebarMenuButton, { size: "lg", className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
                                    React.createElement("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground" },
                                        React.createElement(avatarViewer_1["default"], { imageUrl: currentAccount.avatar, name: currentAccount.name })),
                                    React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                                        React.createElement("span", { className: "truncate font-semibold" }, currentAccount.name),
                                        React.createElement("span", { className: "truncate text-xs capitalize" }, currentAccount.status.toLowerCase())))),
                            React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "w-[15rem] ml-[0.5rem] min-w-56 rounded-lg", side: "bottom", align: "end", sideOffset: 4 }, accountValid === null || accountValid === void 0 ? void 0 :
                                accountValid.map(function (item, index) { return (React.createElement("div", { key: "item-account-" + index },
                                    React.createElement(dropdown_menu_1.DropdownMenuLabel, { className: "p-0 font-normal cursor-pointer", onClick: function () {
                                            return changeCurrentAccount(index);
                                        } },
                                        React.createElement("div", { className: "flex items-center gap-2 p-2 " },
                                            React.createElement("div", { className: "flex aspect-square size-6 items-center justify-center rounded-lg text-sidebar-primary-foreground" },
                                                React.createElement(avatarViewer_1["default"], { imageUrl: item.account
                                                        .avatar, name: item.account
                                                        .name })),
                                            React.createElement("div", { className: "flex w-full justify-between items-center w-full text-left text-sm leading-tight " },
                                                React.createElement("span", { className: "truncate font-thin\tmax-w-[10rem]" }, item.account
                                                    .name),
                                                currentAccount.id ==
                                                    item.accountId && (React.createElement(lucide_react_1.Check, { className: " ml-2 size-4" }))))),
                                    React.createElement(separator_1.Separator, null))); }),
                                React.createElement(new_workspace_1["default"], null)))))) : (React.createElement(skeleton_1.Skeleton, { className: "h-12 w-full" })))),
            React.createElement(sidebar_1.SidebarContent, null,
                React.createElement(sidebar_1.SidebarGroup, { className: "group-data-[collapsible=icon]:hidden" },
                    React.createElement(sidebar_1.SidebarMenu, null,
                        React.createElement(sidebar_1.SidebarMenuItem, { key: "dashboard" },
                            React.createElement(sidebar_1.SidebarMenuButton, { asChild: true },
                                React.createElement(link_1["default"], { href: "/" + lang + "/dashboard/" },
                                    React.createElement(react_icons_1.DashboardIcon, null),
                                    React.createElement("span", { className: "capitalize" }, t("dashboard"))))),
                        React.createElement(sidebar_1.SidebarMenuItem, { key: "crm" },
                            React.createElement(sidebar_1.SidebarMenuButton, { asChild: true },
                                React.createElement(link_1["default"], { href: "/" + lang + "/crm/" },
                                    React.createElement(lucide_react_1.BookUser, null),
                                    React.createElement("span", { className: "capitalize" }, t("crm")))))))),
            React.createElement(sidebar_1.SidebarFooter, null,
                React.createElement("div", { className: "p-1" },
                    React.createElement(card_1.Card, { className: "shadow-none" },
                        React.createElement("form", null,
                            React.createElement(card_1.CardHeader, { className: "p-4 pb-0" },
                                React.createElement(card_1.CardTitle, { className: "text-sm" }, "Marketing block to do"),
                                React.createElement(card_1.CardDescription, null, "Opt-in to receive updates and news about the sidebar.")),
                            React.createElement(card_1.CardContent, { className: "grid gap-2.5 p-4" },
                                React.createElement(button_1.Button, { className: "w-full ", size: "sm" }, "Subscribe"))))),
                React.createElement(sidebar_1.SidebarMenu, null, user ? (React.createElement(sidebar_1.SidebarMenuItem, null,
                    React.createElement(dropdown_menu_1.DropdownMenu, null,
                        React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                            React.createElement(sidebar_1.SidebarMenuButton, { size: "lg", className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
                                React.createElement(avatarViewer_1["default"], { imageUrl: user.avatar, name: user.name }),
                                React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                                    React.createElement("span", { className: "truncate font-semibold" }, user.name),
                                    React.createElement("span", { className: "truncate text-xs" }, user.email)),
                                React.createElement(lucide_react_1.ChevronsUpDown, { className: "ml-auto size-4" }))),
                        React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg", side: "bottom", align: "end", sideOffset: 4 },
                            React.createElement(dropdown_menu_1.DropdownMenuLabel, { className: "p-0 font-normal" },
                                React.createElement("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" },
                                    React.createElement(avatarViewer_1["default"], { imageUrl: user.avatar, name: user.name }),
                                    React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                                        React.createElement("span", { className: "truncate font-semibold" }, user.name),
                                        React.createElement("span", { className: "truncate text-xs" }, user.email)))),
                            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                            React.createElement(dropdown_menu_1.DropdownMenuGroup, { className: "cursor-pointer" },
                                React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: openNotificationSidebar, className: "cursor-pointer flex justify-between items-center" },
                                    React.createElement("div", { className: "flex gap-2 justify-center items-center" },
                                        React.createElement(lucide_react_1.BellRing, { size: 16 }),
                                        t("notifications")),
                                    notificationsNotSeen >
                                        0 && (React.createElement("div", { className: "py-[2px] px-[4px] font-semibold text-white text-xs bg-sidebar-primary rounded-sm" }, notificationsNotSeen)))),
                            currentAccount.status ==
                                "FREE" && (React.createElement(link_1["default"], { href: "/" + lang + "/settings/billing" },
                                React.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "cursor-pointer" },
                                        React.createElement(lucide_react_1.Sparkles, null),
                                        t("upgrade"))))),
                            React.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                                React.createElement(link_1["default"], { href: "/" + lang + "/settings" },
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "cursor-pointer" },
                                        React.createElement(lucide_react_1.Settings, null),
                                        t("settings")))),
                            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                            React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: handleLogOut, className: "cursor-pointer" },
                                React.createElement(lucide_react_1.LogOut, null),
                                t("sign_out")))))) : (React.createElement(skeleton_1.Skeleton, { className: "h-12 w-full" }))))),
        React.createElement(sidebar_1.SidebarInset, { className: "text-sidebar-accent-foreground bg-background" },
            React.createElement("header", { className: "flex h-16 shrink-0 items-center gap-2  " },
                React.createElement("div", { className: "flex items-center gap-2 px-4" },
                    React.createElement(sidebar_1.SidebarTrigger, { className: "-ml-1" }),
                    React.createElement(separator_1.Separator, { orientation: "vertical", className: "mr-2 h-4" }),
                    pathElement.length > 0 ? (React.createElement(breadcrumb_1.Breadcrumb, null,
                        React.createElement(breadcrumb_1.BreadcrumbList, null, pathElement.map(function (item, index) { return (React.createElement("div", { className: "flex items-center gap-1.5 sm:gap-2.5", key: index },
                            React.createElement(breadcrumb_1.BreadcrumbItem, { key: "breadcrumb-" + index },
                                React.createElement(breadcrumb_1.BreadcrumbLink, { className: "capitalize", href: getPath(index) }, index ==
                                    pathElement.length -
                                        1 ? (React.createElement(breadcrumb_1.BreadcrumbPage, null, t(item))) : (React.createElement("span", null, t(item))))),
                            index ==
                                pathElement.length - 1 ? (React.createElement(React.Fragment, null)) : (React.createElement(breadcrumb_1.BreadcrumbSeparator, null,
                                React.createElement(lucide_react_1.ChevronRight, null))))); })))) : (React.createElement(skeleton_1.Skeleton, { className: "h-4 w-32" })))),
            React.createElement("div", { className: "flex flex-1 flex-col gap-4 p-4 pt-0" }, children))));
}
exports.SidebarSaas = SidebarSaas;
