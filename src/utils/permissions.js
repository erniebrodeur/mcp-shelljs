"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOperationPermitted = isOperationPermitted;
exports.requirePermission = requirePermission;
const path_1 = require("./path");
function isOperationPermitted(level, config) {
    switch (level) {
        case path_1.SecurityLevel.READ:
            return true;
        case path_1.SecurityLevel.WRITE:
            return config.enableRw;
        case path_1.SecurityLevel.EXEC:
            return config.enableRw && config.enableExec;
        default:
            return false;
    }
}
function requirePermission(level, config) {
    return function checkPermission() {
        if (!isOperationPermitted(level, config)) {
            const levelName = level === path_1.SecurityLevel.WRITE ? 'write' : 'exec';
            throw new Error(`Permission denied: This operation requires ${levelName} ` +
                `permission. Start the server with --enable-${levelName} flag.`);
        }
    };
}
