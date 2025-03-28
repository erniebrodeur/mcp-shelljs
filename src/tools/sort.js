"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSortTool = registerSortTool;
const utils_1 = require("../utils");
const sort_1 = require("../schemas/tool_params/sort");
/**
 * Registers the sort tool with the MCP server
 *
 * The sort tool sorts lines of text files.
 */
function registerSortTool(server, shellInstance, config) {
    server.tool("sort", "Sort lines. Returns the contents of files sorted line by line.", sort_1.SortParamsSchema.shape, async (params) => {
        try {
            const { files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            return await (0, utils_1.safeShellCommand)(shellInstance.sort.bind(shellInstance), [options, ...filesList], utils_1.SecurityLevel.READ, config, "sort");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
