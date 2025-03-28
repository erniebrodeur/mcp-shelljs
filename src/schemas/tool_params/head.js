"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadParamsSchema = exports.HeadOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// head command options schema
exports.HeadOptionsSchema = common_1.CommonOptionsSchema.extend({
    n: zod_1.z.number().optional().describe('Number of lines to show')
});
// head command parameters schema
exports.HeadParamsSchema = zod_1.z.object({
    files: common_1.PathSchema.describe('Files to read'),
    options: exports.HeadOptionsSchema.optional().default({})
});
