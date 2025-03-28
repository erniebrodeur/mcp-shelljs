"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHeadTool = registerHeadTool;
const utils_1 = require("../utils");
const head_1 = require("../schemas/tool_params/head");
/**
 * Registers the head tool with the MCP server
 *
 * The head tool displays the beginning of files.
 */
function registerHeadTool(server, shellInstance, config) {
    server.tool("head", "Show first lines. Display the beginning of files.", head_1.HeadParamsSchema.shape, async (params) => {
        try {
            const { files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            const headOptions = {};
            if (options && options.n !== undefined) {
                headOptions['-n'] = options.n;
            }
            return await (0, utils_1.safeShellCommand)(shellInstance.head.bind(shellInstance), [headOptions, ...filesList], utils_1.SecurityLevel.READ, config, "head");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
