"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqParamsSchema = exports.UniqOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// uniq command options schema
exports.UniqOptionsSchema = common_1.CommonOptionsSchema.extend({
    i: zod_1.z.boolean().optional().describe('Ignore case while comparing'),
    c: zod_1.z.boolean().optional().describe('Prefix lines by the number of occurrences'),
    d: zod_1.z.boolean().optional().describe('Only print duplicate lines')
});
// uniq command parameters schema
exports.UniqParamsSchema = zod_1.z.object({
    input: zod_1.z.string().describe('Input file'),
    output: zod_1.z.string().optional().describe('Output file (optional)'),
    options: exports.UniqOptionsSchema.optional().default({})
});
