import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ResourceResponse } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { validatePath, SecurityLevel } from "../utils/path";
import { SecurityConfig } from "../utils/permissions";
import { requirePermission } from "../utils/permissions";

export function registerFileResource(server: McpServer, config: SecurityConfig) {
  server.resource(
    "file",
    new ResourceTemplate("file://{filePath*}", { list: undefined }),
    async (uri, { filePath }): Promise<ResourceResponse> => {
      try {
        // Check read permission (always allowed)
        requirePermission(SecurityLevel.READ, config)();
        
        // Validate the path
        // Handle URI encoding and path normalization
        const decodedPath = decodeURIComponent(filePath);
        const normalizedPath = decodedPath.startsWith("/") ? decodedPath.substring(1) : decodedPath;
        
        const fullPath = validatePath(
          normalizedPath,
          { requiredLevel: SecurityLevel.READ }
        );
        
        // Check if file exists
        if (!fs.existsSync(fullPath)) {
          throw new Error(`File not found: ${fullPath}`);
        }
        
        // Check if it's a directory
        if (fs.statSync(fullPath).isDirectory()) {
          throw new Error(`Path is a directory, not a file: ${fullPath}`);
        }
        
        // Read file content
        const content = fs.readFileSync(fullPath, "utf-8");
        
        return {
          contents: [{
            uri: uri.href,
            text: content
          }]
        };
      } catch (error: any) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error: ${error.message}`
          }],
          isError: true
        };
      }
    }
  );
}