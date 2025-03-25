import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Content } from "@modelcontextprotocol/sdk/types.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";

// Import schemas
import { LsParamsSchema, LsParams } from "../schemas/tool_params/ls";
import { PwdParamsSchema, PwdParams } from "../schemas/tool_params/pwd";
import { CatParamsSchema, CatParams } from "../schemas/tool_params/cat";

export function registerReadTools(server: McpServer, shellInstance: typeof shell, config: SecurityConfig) {
  // ls tool
  server.tool(
    "ls",
    LsParamsSchema.shape,
    async (params: LsParams): Promise<ToolResponse> => {
      try {
        const { paths, options } = params;
        const pathInput = paths ? (Array.isArray(paths) ? paths : [paths]) : ['.'];
        const args = [options, ...pathInput];
        
        return await safeShellCommand(
          shellInstance.ls.bind(shellInstance),
          args,
          SecurityLevel.READ,
          config,
          "ls"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // pwd tool
  server.tool(
    "pwd",
    PwdParamsSchema.shape,
    async (params: PwdParams): Promise<ToolResponse> => {
      try {
        return await safeShellCommand(
          shellInstance.pwd.bind(shellInstance),
          [params.options],
          SecurityLevel.READ,
          config,
          "pwd"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // cat tool
  server.tool(
    "cat",
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