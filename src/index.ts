import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { setupTools } from "./tools";
import { setupResources } from "./resources";
import { SecurityConfig } from "./utils/permissions";

async function main() {
  // Parse CLI args for security modes
  const argv = await yargs(hideBin(process.argv))
    .option("enable-rw", { type: "boolean", default: false })
    .option("enable-exec", { type: "boolean", default: false })
    .help()
    .parse();

  // Create security config
  const config: SecurityConfig = {
    enableRw: Boolean(argv["enable-rw"]),
    enableExec: Boolean(argv["enable-exec"])
  };

  console.error(`Starting ShellJS MCP Server (RW: ${config.enableRw}, EXEC: ${config.enableExec})`);

  // Create server
  const server = new McpServer({
    name: "ShellJS",
    version: "1.0.0"
  });

  // Setup tools and resources with security settings
  setupTools(server, config);
  setupResources(server, config);

  // Connect to stdin/stdout for MCP communication
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// Start the server
main().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});