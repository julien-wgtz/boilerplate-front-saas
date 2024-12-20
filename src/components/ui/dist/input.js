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
exports.Input = void 0;
var React = require("react");
var utils_1 = require("@/lib/utils");
var react_icons_1 = require("@radix-ui/react-icons");
var Input = React.forwardRef(function (_a, ref) {
    var className = _a.className, type = _a.type, props = __rest(_a, ["className", "type"]);
    var _b = React.useState(type), typeInput = _b[0], setTypeInput = _b[1];
    var handleTogglePassword = function () {
        if (typeInput === "password") {
            setTypeInput("text");
        }
        else {
            setTypeInput("password");
        }
    };
    return (React.createElement("div", { className: utils_1.cn("relative flex items-center", className) },
        React.createElement("input", __assign({ type: typeInput, className: utils_1.cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"), ref: ref }, props)),
        type == "password" && (React.createElement(React.Fragment, null, typeInput === "password" ? (React.createElement(react_icons_1.EyeOpenIcon, { onClick: handleTogglePassword, className: "absolute right-2 cursor-pointer" })) : (React.createElement(react_icons_1.EyeClosedIcon, { onClick: handleTogglePassword, className: "absolute right-2 cursor-pointer" }))))));
});
exports.Input = Input;
Input.displayName = "Input";
