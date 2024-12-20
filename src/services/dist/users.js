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
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.signup = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/auth/register", {
                            method: "POST",
                            body: JSON.stringify(credentials),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.login = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/auth/login", {
                            method: "POST",
                            body: JSON.stringify(credentials),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/auth/logout", {
                            method: "POST",
                            credentials: "include"
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.askChangeEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/ask-change-email", {
                            method: "POST",
                            body: JSON.stringify({ email: email }),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.updateEmail = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/change-email", {
                            method: "POST",
                            body: JSON.stringify({ token: token }),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.me = function (cookie) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!cookie) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/me", {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/me", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Cookie: "connect.sid=" + cookie.value
                            }
                        })];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    UserService.resetPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/reset-password", {
                            method: "POST",
                            body: JSON.stringify({ email: email }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.changePasswordToken = function (password, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/change-password-token", {
                            method: "POST",
                            body: JSON.stringify({ password: password, token: token }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.changePassword = function (lastPassword, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/change-password", {
                            method: "POST",
                            body: JSON.stringify({
                                password: password,
                                lastPassword: lastPassword
                            }),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.changeTheme = function (theme) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/change-theme", {
                            method: "POST",
                            body: JSON.stringify({ theme: theme }),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.accounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/accounts", {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.deleteUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/delete-user", {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.changeCurrentAccount = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/change-current-account", {
                            method: "POST",
                            body: JSON.stringify({ accountId: accountId }),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.changeUserName = function (newName) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/change-name", {
                            method: "POST",
                            body: JSON.stringify({
                                name: newName
                            }),
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.updateAvatar = function (avatar, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append("file", avatar, fileName);
                        return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/users/update-avatar", {
                                method: "POST",
                                body: formData,
                                credentials: "include"
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserService;
}());
exports["default"] = UserService;
