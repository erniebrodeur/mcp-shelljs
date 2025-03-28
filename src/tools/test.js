"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTestTool = registerTestTool;
const test_1 = require("../schemas/tool_params/test");
/**
 * Registers the test tool with the MCP server
 *
 * The test tool evaluates file conditions such as existence or type.
 */
function registerTestTool(server, shellInstance, config) {
    server.tool("test", "Test file conditions. Evaluates condition like file existence or type.", test_1.TestParamsSchema.shape, async (params) => {
        try {
            const { expression, path, options } = params;
            const result = shellInstance.test(expression, path);
            return {
                content: [{ type: "text", text: result.toString() }],
                isError: false
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
