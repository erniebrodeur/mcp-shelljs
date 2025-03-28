"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWriteTools = registerWriteTools;
const utils_1 = require("../utils");
// Import schemas
const mkdir_1 = require("../schemas/tool_params/mkdir");
const touch_1 = require("../schemas/tool_params/touch");
const rm_1 = require("../schemas/tool_params/rm");
function registerWriteTools(server, shellInstance, config) {
    // mkdir tool
    server.tool("mkdir", mkdir_1.MkdirParamsSchema.shape, async (params) => {
        try {
            const { dirs, options } = params;
            const dirsList = Array.isArray(dirs) ? dirs : [dirs];
            return await (0, utils_1.safeShellCommand)(shellInstance.mkdir.bind(shellInstance), [options, ...dirsList], utils_1.SecurityLevel.WRITE, config, "mkdir");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
    // touch tool
    server.tool("touch", touch_1.TouchParamsSchema.shape, async (params) => {
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
    // rm tool
    server.tool("rm", rm_1.RmParamsSchema.shape, async (params) => {
        try {
            const { files, options } = params;
            const filesList = Array.isArray(files) ? files : [files];
            return await (0, utils_1.safeShellCommand)(shellInstance.rm.bind(shellInstance), [options, ...filesList], utils_1.SecurityLevel.WRITE, config, "rm");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
