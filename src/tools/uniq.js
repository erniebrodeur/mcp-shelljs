"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUniqTool = registerUniqTool;
const utils_1 = require("../utils");
const uniq_1 = require("../schemas/tool_params/uniq");
/**
 * Registers the uniq tool with the MCP server
 *
 * The uniq tool filters out repeated lines in a file.
 */
function registerUniqTool(server, shellInstance, config) {
    server.tool("uniq", "Filter duplicate lines. Keep only unique lines from input.", uniq_1.UniqParamsSchema.shape, async (params) => {
        try {
            const { input, output, options } = params;
            const args = output ? [options, input, output] : [options, input];
            return await (0, utils_1.safeShellCommand)(shellInstance.uniq.bind(shellInstance), args, utils_1.SecurityLevel.READ, config, "uniq");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
