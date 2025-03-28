"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceOptionSchema = exports.RecursiveOptionSchema = exports.PathSchema = exports.CommonOptionsSchema = void 0;
exports.isRecursiveEnabled = isRecursiveEnabled;
exports.isForceEnabled = isForceEnabled;
const zod_1 = require("zod");
// Common option flags for tools
exports.CommonOptionsSchema = zod_1.z.object({
    silent: zod_1.z.boolean().optional().default(true).describe('Silence command output')
}).passthrough();
// Base schema for path operations
exports.PathSchema = zod_1.z.union([
    zod_1.z.string().describe('File or directory path'),
    zod_1.z.array(zod_1.z.string()).describe('Array of file or directory paths')
]);
// Common recursive flag option
exports.RecursiveOptionSchema = zod_1.z.object({
    r: zod_1.z.boolean().optional().describe('Recursive operation'),
    R: zod_1.z.boolean().optional().describe('Recursive operation (alias for -r)')
}).passthrough();
// Common force flag option
exports.ForceOptionSchema = zod_1.z.object({
    f: zod_1.z.boolean().optional().describe('Force operation without confirmation')
}).passthrough();
// Helper function to check if recursive option is enabled
function isRecursiveEnabled(options) {
    return Boolean(options?.r || options?.R);
}
// Helper function to check if force option is enabled
function isForceEnabled(options) {
    return Boolean(options?.f);
}
