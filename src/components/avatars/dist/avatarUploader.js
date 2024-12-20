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
var react_1 = require("react");
var react_dropzone_1 = require("react-dropzone");
var react_avatar_editor_1 = require("react-avatar-editor");
var avatar_1 = require("../ui/avatar");
var button_1 = require("../ui/button");
var alert_dialog_1 = require("../ui/alert-dialog");
var react_alert_dialog_1 = require("@radix-ui/react-alert-dialog");
var next_intl_1 = require("next-intl");
var userStore_1 = require("@/stores/userStore");
var slider_1 = require("../ui/slider");
var AvatarUploader = function (_a) {
    var initialAvatar = _a.initialAvatar, fallbackAvatar = _a.fallbackAvatar, _b = _a.disabled, disabled = _b === void 0 ? false : _b, onSave = _a.onSave;
    var _c = react_1.useState(null), image = _c[0], setImage = _c[1];
    var _d = react_1.useState(initialAvatar), preview = _d[0], setPreview = _d[1];
    var _e = react_1.useState(false), isOpenDialog = _e[0], setIsOpenDialog = _e[1];
    var _f = react_1.useState(1), scale = _f[0], setScale = _f[1];
    var editorRef = react_1.useRef(null);
    var t = next_intl_1.useTranslations();
    var user = userStore_1["default"]().user;
    var handleDrop = function (acceptedFiles) {
        setIsOpenDialog(true);
        var file = acceptedFiles[0];
        if (file) {
            setImage(file);
        }
    };
    react_1.useEffect(function () {
        setPreview(initialAvatar);
    }, [initialAvatar]);
    var handleSave = function () {
        if (editorRef.current) {
            var canvas = editorRef.current.getImageScaledToCanvas();
            var highResCanvas = document.createElement("canvas");
            var scaleFactor = 4;
            highResCanvas.width =
                canvas.width * scaleFactor;
            highResCanvas.height =
                canvas.height * scaleFactor;
            var ctx = highResCanvas.getContext("2d");
            if (ctx) {
                ctx.scale(scaleFactor, scaleFactor);
                ctx.drawImage(canvas, 0, 0);
            }
            highResCanvas.toBlob(function (blob) { return __awaiter(void 0, void 0, void 0, function () {
                var fileReader;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!blob)
                                return [2 /*return*/];
                            fileReader = new FileReader();
                            fileReader.onload = function () {
                                var imageUrl = fileReader.result;
                                setPreview(imageUrl);
                                setImage(null);
                            };
                            fileReader.readAsDataURL(blob);
                            return [4 /*yield*/, onSave(blob, (image === null || image === void 0 ? void 0 : image.name) || "avatar.png")];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, (image === null || image === void 0 ? void 0 : image.type) || "image/png"); // Assurez-vous que le type est "image/png"
        }
        setIsOpenDialog(false);
        setScale(1);
    };
    return (react_1["default"].createElement("div", { style: { textAlign: "center" } },
        react_1["default"].createElement(alert_dialog_1.AlertDialog, { open: isOpenDialog },
            react_1["default"].createElement(alert_dialog_1.AlertDialogContent, null,
                react_1["default"].createElement(alert_dialog_1.AlertDialogHeader, null,
                    react_1["default"].createElement(alert_dialog_1.AlertDialogTitle, null, "Edit profile"),
                    react_1["default"].createElement(react_alert_dialog_1.AlertDialogDescription, null, "Make changes to your profile here. Click save when you're done.")),
                react_1["default"].createElement(react_avatar_editor_1["default"], { ref: editorRef, image: image, width: 350, height: 350, border: 50, borderRadius: 75, scale: scale }),
                react_1["default"].createElement(alert_dialog_1.AlertDialogFooter, null,
                    react_1["default"].createElement("div", { className: "flex flex-col w-full gap-4" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(slider_1.Slider, { defaultValue: [scale], max: 5, min: 1, step: 0.1, onValueChange: function (value) {
                                    setScale(value[0]);
                                } })),
                        react_1["default"].createElement("div", { className: "flex justify-end gap-4" },
                            react_1["default"].createElement(button_1.Button, { type: "submit", onClick: function () {
                                    setIsOpenDialog(false);
                                    setImage(null);
                                    setScale(1);
                                } }, t("cancel")),
                            react_1["default"].createElement(button_1.Button, { type: "submit", onClick: handleSave }, t("save"))))))),
        !image && (react_1["default"].createElement(react_dropzone_1["default"], { onDrop: handleDrop, accept: { "image/*": [] } }, function (_a) {
            var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
            return (react_1["default"].createElement(avatar_1.Avatar, __assign({ className: "h-24 w-24 rounded-lg cursor-pointer" }, getRootProps()),
                react_1["default"].createElement("input", __assign({ disabled: disabled }, getInputProps())),
                react_1["default"].createElement(avatar_1.AvatarImage, { src: preview, alt: fallbackAvatar }),
                react_1["default"].createElement(avatar_1.AvatarFallback, { className: "rounded-lg bg-muted text-3xl" }, fallbackAvatar[0].toUpperCase())));
        }))));
};
exports["default"] = AvatarUploader;
