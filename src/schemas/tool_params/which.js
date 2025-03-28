"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhichParamsSchema = exports.WhichOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// which command options schema
exports.WhichOptionsSchema = common_1.CommonOptionsSchema;
// which command parameters schema
exports.WhichParamsSchema = zod_1.z.object({
    command: zod_1.z.string().describe('Command to locate in PATH'),
    options: exports.WhichOptionsSchema.optional().default({})
});
