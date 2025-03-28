"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceResponseSchema = exports.ResourceContentSchema = exports.ToolResponseSchema = void 0;
const zod_1 = require("zod");
// Tool response schema
exports.ToolResponseSchema = zod_1.z.object({
    content: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.literal('text'),
        text: zod_1.z.string()
    })),
    isError: zod_1.z.boolean().optional(),
    errorDetail: zod_1.z.object({
        code: zod_1.z.number(),
        message: zod_1.z.string()
    }).optional()
});
// Resource content item schema
exports.ResourceContentSchema = zod_1.z.object({
    uri: zod_1.z.string(),
    text: zod_1.z.string()
});
// Resource response schema
exports.ResourceResponseSchema = zod_1.z.object({
    contents: zod_1.z.array(exports.ResourceContentSchema),
    isError: zod_1.z.boolean().optional()
});
