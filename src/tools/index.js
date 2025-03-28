"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTools = setupTools;
const shell = __importStar(require("shelljs"));
const path_1 = require("../utils/path");
// Import all tool registration functions
const ls_1 = require("./ls");
const pwd_1 = require("./pwd");
const cat_1 = require("./cat");
const grep_1 = require("./grep");
const find_1 = require("./find");
const which_1 = require("./which");
const test_1 = require("./test");
const head_1 = require("./head");
const tail_1 = require("./tail");
const sort_1 = require("./sort");
const uniq_1 = require("./uniq");
// Write tools
const mkdir_1 = require("./mkdir");
const touch_1 = require("./touch");
const rm_1 = require("./rm");
// Exec tool
const exec_1 = require("./exec");
// Map tools to their security levels for registration
const tools = [
    // Read tools
    { register: ls_1.registerLsTool, level: path_1.SecurityLevel.READ },
    { register: pwd_1.registerPwdTool, level: path_1.SecurityLevel.READ },
    { register: cat_1.registerCatTool, level: path_1.SecurityLevel.READ },
    { register: grep_1.registerGrepTool, level: path_1.SecurityLevel.READ },
    { register: find_1.registerFindTool, level: path_1.SecurityLevel.READ },
    { register: which_1.registerWhichTool, level: path_1.SecurityLevel.READ },
    { register: test_1.registerTestTool, level: path_1.SecurityLevel.READ },
    { register: head_1.registerHeadTool, level: path_1.SecurityLevel.READ },
    { register: tail_1.registerTailTool, level: path_1.SecurityLevel.READ },
    { register: sort_1.registerSortTool, level: path_1.SecurityLevel.READ },
    { register: uniq_1.registerUniqTool, level: path_1.SecurityLevel.READ },
    // Write tools
    { register: mkdir_1.registerMkdirTool, level: path_1.SecurityLevel.WRITE },
    { register: touch_1.registerTouchTool, level: path_1.SecurityLevel.WRITE },
    { register: rm_1.registerRmTool, level: path_1.SecurityLevel.WRITE },
    // Exec tool
    { register: exec_1.registerExecTool, level: path_1.SecurityLevel.EXEC }
];
function setupTools(server, config) {
    // Register tools based on security level
    for (const { register, level } of tools) {
        if (level === path_1.SecurityLevel.READ ||
            (level === path_1.SecurityLevel.WRITE && config.enableRw) ||
            (level === path_1.SecurityLevel.EXEC && config.enableRw && config.enableExec)) {
            register(server, shell, config);
        }
    }
}
