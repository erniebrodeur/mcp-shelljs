"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmParamsSchema = exports.RmOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// rm command options schema - combine recursive and force options
exports.RmOptionsSchema = common_1.CommonOptionsSchema
    .merge(common_1.RecursiveOptionSchema)
    .merge(common_1.ForceOptionSchema);
// rm command parameters schema
exports.RmParamsSchema = zod_1.z.object({
    files: common_1.PathSchema.describe('Files or directories to remove'),
    options: exports.RmOptionsSchema.optional().default({})
});
