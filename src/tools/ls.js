"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLsTool = registerLsTool;
const utils_1 = require("../utils");
const ls_1 = require("../schemas/tool_params/ls");
/**
 * Registers the ls tool with the MCP server
 *
 * The ls tool lists directory contents with options for formatting and filtering.
 */
function registerLsTool(server, shellInstance, config) {
    server.tool("ls", "List directory contents. Shows files and directories with optional formatting and filtering.", ls_1.LsParamsSchema.shape, async (params) => {
        try {
            const { paths, options } = params;
            const pathInput = paths ? (Array.isArray(paths) ? paths : [paths]) : ['.'];
            const args = [options, ...pathInput];
            return await (0, utils_1.safeShellCommand)(shellInstance.ls.bind(shellInstance), args, utils_1.SecurityLevel.READ, config, "ls");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
