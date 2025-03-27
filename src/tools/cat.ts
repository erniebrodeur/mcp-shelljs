import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { CatParamsSchema, CatParams } from "../schemas/tool_params/cat";

/**
 * Registers the cat tool with the MCP server
 * 
 * The cat tool displays file contents, either for a single file or concatenated from multiple files.
 */
export function registerCatTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "cat",
    "Print file contents. Displays the content of one or more files concatenated.",
    CatParamsSchema.shape,
    async (params: CatParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.cat.bind(shellInstance),
          [options, ...filesList],
          SecurityLevel.READ,
          config,
          "cat"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );
}