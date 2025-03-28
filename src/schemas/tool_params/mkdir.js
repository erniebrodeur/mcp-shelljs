"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MkdirParamsSchema = exports.MkdirOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// mkdir command options schema
exports.MkdirOptionsSchema = common_1.CommonOptionsSchema.extend({
    p: zod_1.z.boolean().optional().describe('Create intermediate directories as needed')
});
// mkdir command parameters schema
exports.MkdirParamsSchema = zod_1.z.object({
    dirs: common_1.PathSchema.describe('Directories to create'),
    options: exports.MkdirOptionsSchema.optional().default({})
});
