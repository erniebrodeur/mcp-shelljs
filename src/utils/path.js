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
exports.SecurityLevel = void 0;
exports.validatePath = validatePath;
exports.validatePaths = validatePaths;
exports.isGlobSafe = isGlobSafe;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
var SecurityLevel;
(function (SecurityLevel) {
    SecurityLevel["READ"] = "read";
    SecurityLevel["WRITE"] = "write";
    SecurityLevel["EXEC"] = "exec";
})(SecurityLevel || (exports.SecurityLevel = SecurityLevel = {}));
const DEFAULT_OPTIONS = {
    allowOutsideCwd: false,
    allowedDirs: [],
    requiredLevel: SecurityLevel.READ
};
function validatePath(filePath, options = {}) {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    // Normalize path to prevent directory traversal
    const normalizedPath = path.normalize(filePath);
    // Convert to absolute path
    const absolutePath = path.isAbsolute(normalizedPath)
        ? normalizedPath
        : path.resolve(process.cwd(), normalizedPath);
    // Check if path exists (for read operations)
    if (opts.requiredLevel === SecurityLevel.READ && !fs.existsSync(absolutePath)) {
        throw new Error(`Path does not exist: ${absolutePath}`);
    }
    // Check if path is within allowed directories
    const isInCwd = absolutePath.startsWith(process.cwd());
    const isInAllowedDir = opts.allowedDirs?.some(dir => absolutePath.startsWith(path.resolve(dir))) ?? false;
    if (!opts.allowOutsideCwd && !isInCwd && !isInAllowedDir) {
        throw new Error(`Access denied: ${absolutePath} is outside allowed directories`);
    }
    return absolutePath;
}
function validatePaths(filePaths, options = {}) {
    return filePaths.map(p => validatePath(p, options));
}
function isGlobSafe(pattern) {
    const suspicious = [
        /\.\.[\/\\]/, // Directory traversal
        /^~[\/\\]/, // Home directory
        /^[\/\\]etc[\/\\]/, // System files
        /^[\/\\]root[\/\\]/, // Root user directory
    ];
    return !suspicious.some(regex => regex.test(pattern));
}
