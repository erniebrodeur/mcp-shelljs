"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatParamsSchema = exports.CatOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// cat command options schema
exports.CatOptionsSchema = common_1.CommonOptionsSchema.extend({
    n: zod_1.z.boolean().optional().describe('Number all output lines')
});
// cat command parameters schema
exports.CatParamsSchema = zod_1.z.object({
    files: common_1.PathSchema.describe('Files to concatenate and print'),
    options: exports.CatOptionsSchema.optional().default({})
});
