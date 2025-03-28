"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailParamsSchema = exports.TailOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// tail command options schema
exports.TailOptionsSchema = common_1.CommonOptionsSchema.extend({
    n: zod_1.z.number().optional().describe('Number of lines to show')
});
// tail command parameters schema
exports.TailParamsSchema = zod_1.z.object({
    files: common_1.PathSchema.describe('Files to read'),
    options: exports.TailOptionsSchema.optional().default({})
});
