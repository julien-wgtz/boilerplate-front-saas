"use strict";
exports.__esModule = true;
exports.hasRole = void 0;
exports.hasRole = function (userRoles, roles) {
    return roles.some(function (role) {
        return userRoles.includes(role);
    });
};
