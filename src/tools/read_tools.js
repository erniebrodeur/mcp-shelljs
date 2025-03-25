"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerReadTools = registerReadTools;
const zod_1 = require("zod");
const utils_1 = require("../utils");
function registerReadTools(server, shellInstance, config) {
    // ls tool
    server.tool("ls", {
        paths: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
        options: zod_1.z.object({
            R: zod_1.z.boolean().optional().describe("Recursive"),
            A: zod_1.z.boolean().optional().describe("All files (include hidden)"),
            L: zod_1.z.boolean().optional().describe("Follow symlinks"),
            d: zod_1.z.boolean().optional().describe("List directories themselves")
        }).optional()
    }, async ({ paths, options = {} }) => {
        try {
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
    // pwd tool
    server.tool("pwd", {}, async () => {
        try {
            return await (0, utils_1.safeShellCommand)(shellInstance.pwd.bind(shellInstance), [], utils_1.SecurityLevel.READ, config, "pwd");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
