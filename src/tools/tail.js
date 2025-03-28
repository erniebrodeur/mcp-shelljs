"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTailTool = registerTailTool;
const utils_1 = require("../utils");
const tail_1 = require("../schemas/tool_params/tail");
/**
 * Registers the tail tool with the MCP server
 *
 * The tail tool displays the end of files.
 */
function registerTailTool(server, shellInstance, config) {
    server.tool("tail", "Show last lines. Display the end of files.", tail_1.TailParamsSchema.shape, async (params) => {
        try {
            const { files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            const tailOptions = {};
            if (options && options.n !== undefined) {
                tailOptions['-n'] = options.n;
            }
            return await (0, utils_1.safeShellCommand)(shellInstance.tail.bind(shellInstance), [tailOptions, ...filesList], utils_1.SecurityLevel.READ, config, "tail");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
