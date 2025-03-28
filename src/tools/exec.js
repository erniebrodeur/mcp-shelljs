"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecParamsSchema = exports.ExecOptionsSchema = void 0;
exports.registerExecTool = registerExecTool;
const utils_1 = require("../utils");
const zod_1 = require("zod");
const common_1 = require("../schemas/common");
// Define exec parameters schema
exports.ExecOptionsSchema = common_1.CommonOptionsSchema.extend({
    async: zod_1.z.boolean().optional().describe("Run asynchronously"),
    silent: zod_1.z.boolean().optional().describe("Silence command output"),
    encoding: zod_1.z.string().optional().describe("Character encoding")
});
exports.ExecParamsSchema = zod_1.z.object({
    command: zod_1.z.string().describe("Command to execute"),
    options: exports.ExecOptionsSchema.optional().default({})
});
/**
 * Registers the exec tool with the MCP server
 *
 * The exec tool executes shell commands. This requires special permission.
 */
function registerExecTool(server, shellInstance, config) {
    server.tool("exec", "Execute shell command. Runs an arbitrary command in the system shell. Requires --enable-exec flag.", exports.ExecParamsSchema.shape, async (params) => {
        try {
            const { command, options } = params;
            // Add a warning about exec access
            console.warn(`SECURITY: Executing command: ${command}`);
            return await (0, utils_1.safeShellCommand)(shellInstance.exec.bind(shellInstance), [command, options], utils_1.SecurityLevel.EXEC, config, "exec");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
