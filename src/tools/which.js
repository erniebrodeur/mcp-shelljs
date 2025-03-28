"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWhichTool = registerWhichTool;
const utils_1 = require("../utils");
const which_1 = require("../schemas/tool_params/which");
/**
 * Registers the which tool with the MCP server
 *
 * The which tool locates a command in the system PATH.
 */
function registerWhichTool(server, shellInstance, config) {
    server.tool("which", "Locate a command. Shows the path to an executable in the system's PATH.", which_1.WhichParamsSchema.shape, async (params) => {
        try {
            const { command, options } = params;
            return await (0, utils_1.safeShellCommand)(shellInstance.which.bind(shellInstance), [command], utils_1.SecurityLevel.READ, config, "which");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
