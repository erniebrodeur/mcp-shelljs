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
exports.registerDirectoryResource = registerDirectoryResource;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const shell = __importStar(require("shelljs"));
const fs = __importStar(require("fs"));
const path_1 = require("../utils/path");
const permissions_1 = require("../utils/permissions");
function registerDirectoryResource(server, config) {
    server.resource("directory", new mcp_js_1.ResourceTemplate("directory://{dirPath*}", { list: undefined }), async (uri, { dirPath }) => {
        try {
            // Check read permission (always allowed)
            (0, permissions_1.requirePermission)(path_1.SecurityLevel.READ, config)();
            // Validate the path
            // Handle URI encoding and path normalization
            const decodedPath = decodeURIComponent(dirPath);
            const normalizedPath = decodedPath.startsWith("/") ? decodedPath.substring(1) : decodedPath;
            const fullPath = (0, path_1.validatePath)(normalizedPath, { requiredLevel: path_1.SecurityLevel.READ });
            // Check if directory exists
            if (!fs.existsSync(fullPath)) {
                throw new Error(`Directory not found: ${fullPath}`);
            }
            // Check if it's actually a directory
            if (!fs.statSync(fullPath).isDirectory()) {
                throw new Error(`Path is not a directory: ${fullPath}`);
            }
            // Get directory listing
            const result = shell.ls("-la", fullPath);
            return {
                contents: [{
                        uri: uri.href,
                        text: result.stdout
                    }]
            };
        }
        catch (error) {
            return {
                contents: [{
                        uri: uri.href,
                        text: `Error: ${error.message}`
                    }],
                isError: true
            };
        }
    });
}
