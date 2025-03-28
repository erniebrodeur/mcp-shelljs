"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestParamsSchema = exports.TestExpressionType = exports.TestOptionsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
// test command options schema
exports.TestOptionsSchema = common_1.CommonOptionsSchema;
// Valid test expressions
exports.TestExpressionType = zod_1.z.enum([
    '-b', // path is a block device
    '-c', // path is a character device
    '-d', // path is a directory
    '-e', // path exists
    '-f', // path is a regular file
    '-L', // path is a symbolic link
    '-p', // path is a pipe (FIFO)
    '-S' // path is a socket
]);
// test command parameters schema
exports.TestParamsSchema = zod_1.z.object({
    expression: exports.TestExpressionType.describe('Test expression (e.g., -d for directory)'),
    path: zod_1.z.string().describe('Path to test'),
    options: exports.TestOptionsSchema.optional().default({})
});
