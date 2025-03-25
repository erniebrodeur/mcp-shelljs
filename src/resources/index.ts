import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerFileResource } from "./file_resource";
import { registerDirectoryResource } from "./directory_resource";
import { SecurityConfig } from "../utils/permissions";

export function setupResources(server: McpServer, config: SecurityConfig): void {
  registerFileResource(server, config);
  registerDirectoryResource(server, config);
}