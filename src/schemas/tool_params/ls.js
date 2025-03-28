"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LsParamsSchema = exports.LsOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// ls command options schema
exports.LsOptionsSchema = common_1.CommonOptionsSchema.extend({
    R: zod_1.z.boolean().optional().describe('Recursive, list subdirectories recursively'),
    A: zod_1.z.boolean().optional().describe('All, include files beginning with . (except for . and ..)'),
    L: zod_1.z.boolean().optional().describe('Follow symlinks'),
    d: zod_1.z.boolean().optional().describe('List directories themselves, not their contents'),
    l: zod_1.z.boolean().optional().describe('Long format, display file metadata')
});
// ls command parameters schema
exports.LsParamsSchema = zod_1.z.object({
    paths: common_1.PathSchema.optional().describe('Paths to list. Defaults to current directory if not specified.'),
    options: exports.LsOptionsSchema.optional().default({})
});
