"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTouchTool = registerTouchTool;
const utils_1 = require("../utils");
const touch_1 = require("../schemas/tool_params/touch");
/**
 * Registers the touch tool with the MCP server
 *
 * The touch tool creates empty files or updates file timestamps.
 */
function registerTouchTool(server, shellInstance, config) {
    server.tool("touch", "Create or update file timestamps. Updates access/modification times of files, creates empty files if they don't exist.", touch_1.TouchParamsSchema.shape, async (params) => {
        try {
            const { files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            return await (0, utils_1.safeShellCommand)(shellInstance.touch.bind(shellInstance), [options, ...filesList], utils_1.SecurityLevel.WRITE, config, "touch");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
