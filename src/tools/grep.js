"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGrepTool = registerGrepTool;
const utils_1 = require("../utils");
const grep_1 = require("../schemas/tool_params/grep");
/**
 * Registers the grep tool with the MCP server
 *
 * The grep tool searches for patterns in files and returns matching lines.
 */
function registerGrepTool(server, shellInstance, config) {
    server.tool("grep", "Search files for patterns. Returns lines matching the specified pattern.", grep_1.GrepParamsSchema.shape, async (params) => {
        try {
            const { pattern, files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            return await (0, utils_1.safeShellCommand)(shellInstance.grep.bind(shellInstance), [options, pattern, ...filesList], utils_1.SecurityLevel.READ, config, "grep");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
