"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
/**
 * Custom world class for MCP-ShellJS tests
 */
class McpWorld extends cucumber_1.World {
    // Server state and response tracking
    serverMode = 'read-only';
    response = null;
    error = null;
    constructor(options) {
        super(options);
    }
}
exports.McpWorld = McpWorld;
(0, cucumber_1.setWorldConstructor)(McpWorld);
