"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFindTool = registerFindTool;
const utils_1 = require("../utils");
const find_1 = require("../schemas/tool_params/find");
/**
 * Registers the find tool with the MCP server
 *
 * The find tool recursively searches for files in directories.
 */
function registerFindTool(server, shellInstance, config) {
    server.tool("find", "Find files recursively. Returns all files (however deep) in the given paths.", find_1.FindParamsSchema.shape, async (params) => {
        try {
            const { paths, options } = params;
            const pathsList = Array.isArray(paths) ? paths : [paths];
            return await (0, utils_1.safeShellCommand)(shellInstance.find.bind(shellInstance), pathsList, utils_1.SecurityLevel.READ, config, "find");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
