import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { TestParamsSchema, TestParams } from "../schemas/tool_params/test";

/**
 * Registers the test tool with the MCP server
 * 
 * The test tool evaluates file conditions such as existence or type.
 */
export function registerTestTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "test",
    "Test file conditions. Evaluates condition like file existence or type.",
    TestParamsSchema.shape,
    async (params: TestParams): Promise<ToolResponse> => {
      try {
        const { expression, path, options } = params;
        
        const result = shellInstance.test(expression, path);
        return {
          content: [{ type: "text", text: result.toString() }],
          isError: false
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );
}