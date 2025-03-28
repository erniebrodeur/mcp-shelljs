"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMkdirTool = registerMkdirTool;
const utils_1 = require("../utils");
const mkdir_1 = require("../schemas/tool_params/mkdir");
/**
 * Registers the mkdir tool with the MCP server
 *
 * The mkdir tool creates directories.
 */
function registerMkdirTool(server, shellInstance, config) {
    server.tool("mkdir", "Create directories. Creates directory structure with optional support for creating intermediate directories.", mkdir_1.MkdirParamsSchema.shape, async (params) => {
        try {
            const { dirs, options } = params;
            const dirsList = Array.isArray(dirs) ? dirs : [dirs];
            return await (0, utils_1.safeShellCommand)(shellInstance.mkdir.bind(shellInstance), [options, ...dirsList], utils_1.SecurityLevel.WRITE, config, "mkdir");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
