import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ResourceResponse } from "@modelcontextprotocol/sdk/types.js";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";
import { validatePath, SecurityLevel } from "../utils/path";
import { SecurityConfig } from "../utils/permissions";
import { requirePermission } from "../utils/permissions";

export function registerDirectoryResource(server: McpServer, config: SecurityConfig) {
  server.resource(
    "directory",
    new ResourceTemplate("directory://{dirPath*}", { list: undefined }),
    async (uri, { dirPath }): Promise<ResourceResponse> => {
      try {
        // Check read permission (always allowed)
        requirePermission(SecurityLevel.READ, config)();
        
        // Validate the path
        // Handle URI encoding and path normalization
        const decodedPath = decodeURIComponent(dirPath);
        const normalizedPath = decodedPath.startsWith("/") ? decodedPath.substring(1) : decodedPath;
        
        const fullPath = validatePath(
          normalizedPath,
          { requiredLevel: SecurityLevel.READ }
        );
        
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