"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortParamsSchema = exports.SortOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// sort command options schema
exports.SortOptionsSchema = common_1.CommonOptionsSchema.extend({
    r: zod_1.z.boolean().optional().describe('Reverse the results'),
    n: zod_1.z.boolean().optional().describe('Compare according to numerical value')
});
// sort command parameters schema
exports.SortParamsSchema = zod_1.z.object({
    files: common_1.PathSchema.describe('Files to sort'),
    options: exports.SortOptionsSchema.optional().default({})
});
