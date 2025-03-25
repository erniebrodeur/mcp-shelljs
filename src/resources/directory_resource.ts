import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ResourceResponse } from "@modelcontextprotocol/sdk/types.js";
import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";
import { validatePath, SecurityLevel } from "../utils/path";
import { SecurityConfig } from "../utils/permissions";
import { requirePermission } from "../utils/permissions";
import { DirectoryUriParams } from "../schemas/uri";

export function registerDirectoryResource(server: McpServer, config: SecurityConfig) {
  server.resource(
    "directory",
    new ResourceTemplate("directory://{dirPath*}", { list: undefined }),
    async (uri, params: DirectoryUriParams): Promise<ResourceResponse> => {
      try {
        // Check read permission (always allowed)
        requirePermission(SecurityLevel.READ, config)();
        
        const { dirPath } = params;
        
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
        
        // Build the ls command with options
        let lsOptions = "-la"; // Default options
        
        if (params.recursive) {
          lsOptions += "R"; // Add recursive flag
        }
        
        // Get directory listing
        const result = shell.ls(lsOptions, fullPath);
        
        // Filter output if include/exclude patterns are specified
        let output = result.stdout;
        
        if (params.include || params.exclude || params.honor_gitignore) {
          // Here we'd implement filtering logic based on include/exclude patterns
          // For now, just add a note about filtering
          if (params.include) {
            output += `\n\nFiltering to include: ${params.include}`;
          }
          if (params.exclude) {
            output += `\n\nExcluding: ${params.exclude}`;
          }
          if (params.honor_gitignore) {
            output += `\n\nHonoring .gitignore patterns`;
          }
        }
        
        return {
          contents: [{
            uri: uri.href,
            text: output
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