"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrepParamsSchema = exports.GrepOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// grep command options schema
exports.GrepOptionsSchema = common_1.CommonOptionsSchema.extend({
    v: zod_1.z.boolean().optional().describe('Invert the match (only print non-matching lines)'),
    l: zod_1.z.boolean().optional().describe('Print only filenames of matching files'),
    i: zod_1.z.boolean().optional().describe('Ignore case'),
    n: zod_1.z.boolean().optional().describe('Print line numbers')
});
// grep command parameters schema
exports.GrepParamsSchema = zod_1.z.object({
    pattern: zod_1.z.string().describe('Pattern to search for (regex)'),
    files: common_1.PathSchema.describe('Files to search in'),
    options: exports.GrepOptionsSchema.optional().default({})
});
