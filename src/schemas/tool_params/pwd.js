"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PwdParamsSchema = exports.PwdOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// pwd has no specific parameters, just common options
exports.PwdOptionsSchema = common_1.CommonOptionsSchema;
exports.PwdParamsSchema = zod_1.z.object({
    options: exports.PwdOptionsSchema.optional().default({})
});
