"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pwdResponseSchema = exports.pwdInputSchema = void 0;
const zod_1 = require("zod");
/**
 * Parameter schema for pwd command
 * pwd doesn't accept any parameters
 */
exports.pwdInputSchema = zod_1.z.object({}).strict();
/**
 * Response schema for pwd command
 * Returns a ShellString containing the current working directory
 */
exports.pwdResponseSchema = zod_1.z.object({
    stdout: zod_1.z.string(), // The current working directory path
    stderr: zod_1.z.string().optional(), // Error message if any
    code: zod_1.z.number(), // Exit code (0 for success)
});
