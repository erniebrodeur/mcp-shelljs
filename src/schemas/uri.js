"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryUriParamsSchema = exports.FileUriParamsSchema = void 0;
const zod_1 = require("zod");
// Schema for file:// URI parameters
exports.FileUriParamsSchema = zod_1.z.object({
    filePath: zod_1.z.string().describe('Path to file'),
    lines: zod_1.z.boolean().optional().describe('Include line numbers in output'),
    start: zod_1.z.number().optional().describe('First line to include (1-based)'),
    end: zod_1.z.number().optional().describe('Last line to include'),
    highlight: zod_1.z.string().optional().describe('Pattern to highlight in output')
});
// Schema for directory:// URI parameters
exports.DirectoryUriParamsSchema = zod_1.z.object({
    dirPath: zod_1.z.string().describe('Path to directory'),
    include: zod_1.z.string().optional().describe('Glob pattern(s) to include (comma-separated)'),
    exclude: zod_1.z.string().optional().describe('Glob pattern(s) to exclude (comma-separated)'),
    honor_gitignore: zod_1.z.boolean().optional().describe('Honor .gitignore patterns'),
    recursive: zod_1.z.boolean().optional().describe('Include subdirectories recursively')
});
