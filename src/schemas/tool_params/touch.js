"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchParamsSchema = exports.TouchOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// touch command options schema
exports.TouchOptionsSchema = common_1.CommonOptionsSchema.extend({
    a: zod_1.z.boolean().optional().describe('Change only the access time'),
    c: zod_1.z.boolean().optional().describe('Do not create files if they do not exist'),
    m: zod_1.z.boolean().optional().describe('Change only the modification time')
    // Could add date options if needed in the future
});
// touch command parameters schema
exports.TouchParamsSchema = zod_1.z.object({
    files: common_1.PathSchema.describe('Files to touch (create or update timestamp)'),
    options: exports.TouchOptionsSchema.optional().default({})
});
