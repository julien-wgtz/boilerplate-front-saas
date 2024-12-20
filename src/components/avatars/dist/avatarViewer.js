"use strict";
exports.__esModule = true;
var react_1 = require("react");
var avatar_1 = require("../ui/avatar");
var AvatarViewer = function (_a) {
    var imageUrl = _a.imageUrl, name = _a.name, _b = _a.type, type = _b === void 0 ? "primary" : _b, _c = _a.size, size = _c === void 0 ? "small" : _c;
    var _d = react_1.useState(imageUrl), avatar = _d[0], setAvatar = _d[1];
    var _e = react_1.useState(Date.now()), key = _e[0], setKey = _e[1];
    react_1.useEffect(function () {
        setKey(Date.now());
        setAvatar(imageUrl);
    }, [imageUrl]);
    var sizeSquare = size === "small"
        ? "w-8 h-8"
        : size === "medium"
            ? "w-12 h-12"
            : "w-24 h-24";
    var sizeText = size === "small"
        ? "text-xs"
        : size === "medium"
            ? "text-sm"
            : "text-3xl";
    return (react_1["default"].createElement(avatar_1.Avatar, { className: sizeSquare + " rounded-lg" },
        react_1["default"].createElement(avatar_1.AvatarImage, { key: key, src: avatar, alt: name }),
        react_1["default"].createElement(avatar_1.AvatarFallback, { className: "rounded-lg " + (type == "primary"
                ? "bg-muted text-primary"
                : "bg-primary text-secondary") + " " + sizeText }, name[0].toUpperCase())));
};
exports["default"] = AvatarViewer;
