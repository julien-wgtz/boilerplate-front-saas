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
exports.__esModule = true;
var react_1 = require("react");
var react_dropzone_1 = require("react-dropzone");
var react_avatar_editor_1 = require("react-avatar-editor");
var AvatarUploader = function (_a) {
    var initialAvatar = _a.initialAvatar, onSave = _a.onSave;
    var _b = react_1.useState(null), image = _b[0], setImage = _b[1]; // Fichier sélectionné
    var _c = react_1.useState(initialAvatar), preview = _c[0], setPreview = _c[1]; // Avatar actuel ou prévisualisation
    var editorRef = react_1.useRef(null);
    var handleDrop = function (acceptedFiles) {
        var file = acceptedFiles[0];
        if (file) {
            setImage(file);
        }
    };
    var handleSave = function () {
        if (editorRef.current) {
            // Exporter l'image recadrée
            var canvas = editorRef.current.getImageScaledToCanvas();
            var croppedImage = canvas.toDataURL(); // Convertir en base64
            setPreview(croppedImage); // Mettre à jour l'avatar
            setImage(null); // Réinitialiser l'image
            onSave(croppedImage); // Passer l'image au parent pour sauvegarde (backend)
        }
    };
    return (react_1["default"].createElement("div", { style: { textAlign: "center" } }, image ? (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_avatar_editor_1["default"], { ref: editorRef, image: image, width: 150, height: 150, border: 50, borderRadius: 75, scale: 1.2 }),
        react_1["default"].createElement("button", { onClick: handleSave, style: { marginTop: "10px" } }, "Sauvegarder"))) : (react_1["default"].createElement(react_dropzone_1["default"], { onDrop: handleDrop, accept: { "image/*": [] } }, function (_a) {
        var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
        return (react_1["default"].createElement("div", __assign({}, getRootProps(), { style: {
                width: "150px",
                height: "150px",
                border: "2px dashed gray",
                borderRadius: "50%",
                cursor: "pointer",
                background: preview
                    ? "url(" + preview + ")"
                    : "#007AFF",
                backgroundSize: "cover",
                backgroundPosition: "center"
            } }),
            react_1["default"].createElement("input", __assign({}, getInputProps())),
            !preview && (react_1["default"].createElement("p", { style: {
                    color: "white",
                    lineHeight: "150px"
                } }, "+"))));
    }))));
};
exports["default"] = AvatarUploader;
