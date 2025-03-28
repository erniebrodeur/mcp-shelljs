"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCatTool = registerCatTool;
const utils_1 = require("../utils");
const cat_1 = require("../schemas/tool_params/cat");
/**
 * Registers the cat tool with the MCP server
 *
 * The cat tool displays file contents, either for a single file or concatenated from multiple files.
 */
function registerCatTool(server, shellInstance, config) {
    server.tool("cat", "Print file contents. Displays the content of one or more files concatenated.", cat_1.CatParamsSchema.shape, async (params) => {
        try {
            const { files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            return await (0, utils_1.safeShellCommand)(shellInstance.cat.bind(shellInstance), [options, ...filesList], utils_1.SecurityLevel.READ, config, "cat");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
