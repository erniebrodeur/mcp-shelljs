"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerReadTools = registerReadTools;
const utils_1 = require("../utils");
const path_1 = require("../utils/path");
// Import schemas
const ls_1 = require("../schemas/tool_params/ls");
const pwd_1 = require("../schemas/tool_params/pwd");
const cat_1 = require("../schemas/tool_params/cat");
const grep_1 = require("../schemas/tool_params/grep");
const find_1 = require("../schemas/tool_params/find");
const which_1 = require("../schemas/tool_params/which");
const test_1 = require("../schemas/tool_params/test");
const head_1 = require("../schemas/tool_params/head");
const tail_1 = require("../schemas/tool_params/tail");
const sort_1 = require("../schemas/tool_params/sort");
const uniq_1 = require("../schemas/tool_params/uniq");
function registerReadTools(server, shellInstance, config) {
    // Define descriptions
    const descriptions = {
        ls: "List directory contents. Shows files and directories with optional formatting and filtering.",
        pwd: "Print Working Directory. Shows the absolute path of the current directory.",
        cat: "Print file contents. Displays the content of one or more files concatenated.",
        grep: "Search files for patterns. Returns lines matching the specified pattern.",
        find: "Find files recursively. Returns all files (however deep) in the given paths.",
        which: "Locate a command. Shows the path to an executable in the system's PATH.",
        test: "Test file conditions. Evaluates condition like file existence or type.",
        head: "Show first lines. Display the beginning of files.",
        tail: "Show last lines. Display the end of files.",
        sort: "Sort lines. Returns the contents of files sorted line by line.",
        uniq: "Filter duplicate lines. Keep only unique lines from input."
    };
    // ls tool - List directory contents
    // Lists files and directories in the specified location with optional formatting
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
    // pwd tool - Print Working Directory
    // Displays the absolute path of the current directory
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
    // cat tool
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
    // grep tool - Search for patterns in files
    server.tool("grep", "Search files for patterns. Returns lines matching the specified pattern.", grep_1.GrepParamsSchema.shape, async (params) => {
        try {
            const { pattern, files, options } = params;
            // Validate input parameters
            if (!pattern) {
                throw new Error("Pattern is required");
            }
            // Handle file paths
            const filesList = Array.isArray(files) ? files : [files];
            if (filesList.length === 0) {
                throw new Error("At least one file path is required");
            }
            // Validate all paths
            const validatedPaths = (0, path_1.validatePaths)(filesList, {
                requiredLevel: utils_1.SecurityLevel.READ
            });
            // Create flag string from options
            let flagString = '';
            if (options) {
                if (options.v)
                    flagString += 'v';
                if (options.l)
                    flagString += 'l';
                if (options.i)
                    flagString += 'i';
                if (options.n)
                    flagString += 'n';
            }
            // If any flags are present, prepend with '-'
            const grepOptions = flagString ? `-${flagString}` : undefined;
            // Process arguments based on whether options exist
            const args = grepOptions
                ? [grepOptions, pattern, ...validatedPaths]
                : [pattern, ...validatedPaths];
            // Execute grep command with safety checks
            return await (0, utils_1.safeShellCommand)(shellInstance.grep.bind(shellInstance), args, utils_1.SecurityLevel.READ, config, "grep");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
                errorDetail: {
                    code: 1,
                    message: error.message
                }
            };
        }
    });
    // find tool
    server.tool("find", descriptions.find, find_1.FindParamsSchema.shape, async (params) => {
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
    // which tool
    server.tool("which", descriptions.which, which_1.WhichParamsSchema.shape, async (params) => {
        try {
            const { command, options } = params;
            return await (0, utils_1.safeShellCommand)(shellInstance.which.bind(shellInstance), [command], utils_1.SecurityLevel.READ, config, "which");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
    // test tool
    server.tool("test", descriptions.test, test_1.TestParamsSchema.shape, async (params) => {
        try {
            const { expression, path, options } = params;
            const result = shellInstance.test(expression, path);
            return {
                content: [{ type: "text", text: result.toString() }],
                isError: false
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
    // head tool
    server.tool("head", descriptions.head, head_1.HeadParamsSchema.shape, async (params) => {
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
    // tail tool
    server.tool("tail", descriptions.tail, tail_1.TailParamsSchema.shape, async (params) => {
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
    // sort tool
    server.tool("sort", descriptions.sort, sort_1.SortParamsSchema.shape, async (params) => {
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
    // uniq tool
    server.tool("uniq", descriptions.uniq, uniq_1.UniqParamsSchema.shape, async (params) => {
        try {
            const { input, output, options } = params;
            const args = output ? [options, input, output] : [options, input];
            return await (0, utils_1.safeShellCommand)(shellInstance.uniq.bind(shellInstance), args, utils_1.SecurityLevel.READ, config, "uniq");
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true
            };
        }
    });
}
