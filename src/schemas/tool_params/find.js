"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindParamsSchema = exports.FindOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// find has no specific options in shelljs implementation
exports.FindOptionsSchema = common_1.CommonOptionsSchema;
// find command parameters schema
exports.FindParamsSchema = zod_1.z.object({
    paths: common_1.PathSchema.describe('Base paths to start search from'),
    options: exports.FindOptionsSchema.optional().default({})
});
