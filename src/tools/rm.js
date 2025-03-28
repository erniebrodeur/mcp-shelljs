"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRmTool = registerRmTool;
const utils_1 = require("../utils");
const rm_1 = require("../schemas/tool_params/rm");
/**
 * Registers the rm tool with the MCP server
 *
 * The rm tool removes files and directories.
 */
function registerRmTool(server, shellInstance, config) {
    server.tool("rm", "Remove files or directories. Deletes files with optional support for recursive directory removal.", rm_1.RmParamsSchema.shape, async (params) => {
        try {
            const { files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            return await (0, utils_1.safeShellCommand)(shellInstance.rm.bind(shellInstance), [options, ...filesList], utils_1.SecurityLevel.WRITE, config, "rm");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
