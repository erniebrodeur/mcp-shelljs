"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const tools_1 = require("./tools");
const resources_1 = require("./resources");
async function main() {
    // Parse CLI args for security modes
    const argv = await (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .option("enable-rw", { type: "boolean", default: false })
        .option("enable-exec", { type: "boolean", default: false })
        .help()
        .parse();
    // Create security config
    const config = {
        enableRw: Boolean(argv["enable-rw"]),
        enableExec: Boolean(argv["enable-exec"])
    };
    console.error(`Starting ShellJS MCP Server (RW: ${config.enableRw}, EXEC: ${config.enableExec})`);
    // Create server
    const server = new mcp_js_1.McpServer({
        name: "ShellJS",
        version: "1.0.0"
    });
    // Setup tools and resources with security settings
    (0, tools_1.setupTools)(server, config);
    (0, resources_1.setupResources)(server, config);
    // Connect to stdin/stdout for MCP communication
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
// Start the server
main().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
});
