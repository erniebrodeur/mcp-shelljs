import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { TailParamsSchema, TailParams } from "../schemas/tool_params/tail";

/**
 * Registers the tail tool with the MCP server
 * 
 * The tail tool displays the end of files.
 */
export function registerTailTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "tail",
    "Show last lines. Display the end of files.",
    TailParamsSchema.shape,
    async (params: TailParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        const tailOptions = {};
        
        if (options && options.n !== undefined) {
          tailOptions['-n'] = options.n;
        }
        
        return await safeShellCommand(
          shellInstance.tail.bind(shellInstance),
          [tailOptions, ...filesList],
          SecurityLevel.READ,
          config,
          "tail"
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