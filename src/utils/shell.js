"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseToolOptionsSchema = void 0;
exports.safeShellCommand = safeShellCommand;
exports.createSafeFileCommand = createSafeFileCommand;
const path_1 = require("./path");
const permissions_1 = require("./permissions");
const convert_1 = require("./convert");
const zod_1 = require("zod");
exports.BaseToolOptionsSchema = zod_1.z.object({
    silent: zod_1.z.boolean().optional().default(true),
    async: zod_1.z.boolean().optional().default(false)
}).passthrough();
async function safeShellCommand(command, args, securityLevel, config, commandName) {
    try {
        (0, permissions_1.requirePermission)(securityLevel, config)();
        const result = command(...args);
        return (0, convert_1.shellStringToResponse)(result, commandName);
    }
    catch (error) {
        return (0, convert_1.createErrorResponse)(error.message);
    }
}
function createSafeFileCommand(command, securityLevel, config, commandName) {
    return async function (paths, options = {}) {
        try {
            (0, permissions_1.requirePermission)(securityLevel, config)();
            const pathArray = Array.isArray(paths) ? paths : [paths];
            const validPaths = (0, path_1.validatePaths)(pathArray, {
                requiredLevel: securityLevel
            });
            const result = command(options, ...validPaths);
            return (0, convert_1.shellStringToResponse)(result, commandName);
        }
        catch (error) {
            return (0, convert_1.createErrorResponse)(error.message);
        }
    };
}
