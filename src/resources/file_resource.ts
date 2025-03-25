import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ResourceResponse } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { validatePath, SecurityLevel } from "../utils/path";
import { SecurityConfig } from "../utils/permissions";
import { requirePermission } from "../utils/permissions";
import { FileUriParams } from "../schemas/uri";

export function registerFileResource(server: McpServer, config: SecurityConfig) {
  server.resource(
    "file",
    new ResourceTemplate("file://{filePath*}", { list: undefined }),
    async (uri, params: FileUriParams): Promise<ResourceResponse> => {
      try {
        // Check read permission (always allowed)
        requirePermission(SecurityLevel.READ, config)();
        
        const { filePath } = params;
        
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
        let content = fs.readFileSync(fullPath, "utf-8");
        
        // Handle line number parameters
        if (params.lines) {
          content = content.split('\n')
            .map((line, idx) => `${idx + 1}: ${line}`)
            .join('\n');
        }
        
        // Handle line range parameters
        if (params.start || params.end) {
          const lines = content.split('\n');
          const start = params.start ? params.start - 1 : 0;
          const end = params.end ? params.end - 1 : lines.length - 1;
          content = lines.slice(start, end + 1).join('\n');
        }
        
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