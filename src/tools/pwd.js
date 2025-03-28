"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPwdTool = registerPwdTool;
const utils_1 = require("../utils");
const pwd_1 = require("../schemas/tool_params/pwd");
/**
 * Registers the pwd tool with the MCP server
 *
 * The pwd tool displays the current working directory path.
 */
function registerPwdTool(server, shellInstance, config) {
    server.tool("pwd", "Print Working Directory. Shows the absolute path of the current directory.", pwd_1.PwdParamsSchema.shape, async (params) => {
        try {
            return await (0, utils_1.safeShellCommand)(shellInstance.pwd.bind(shellInstance), [params.options], utils_1.SecurityLevel.READ, config, "pwd");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
