import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { HeadParamsSchema, HeadParams } from "../schemas/tool_params/head";

/**
 * Registers the head tool with the MCP server
 * 
 * The head tool displays the beginning of files.
 */
export function registerHeadTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "head",
    "Show first lines. Display the beginning of files.",
    HeadParamsSchema.shape,
    async (params: HeadParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        const headOptions = {};
        
        if (options && options.n !== undefined) {
          headOptions['-n'] = options.n;
        }
        
        return await safeShellCommand(
          shellInstance.head.bind(shellInstance),
          [headOptions, ...filesList],
          SecurityLevel.READ,
          config,
          "head"
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