import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Content } from "@modelcontextprotocol/sdk/types.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";

// Import schemas
import { MkdirParamsSchema, MkdirParams } from "../schemas/tool_params/mkdir";
import { TouchParamsSchema, TouchParams } from "../schemas/tool_params/touch";
import { RmParamsSchema, RmParams } from "../schemas/tool_params/rm";

export function registerWriteTools(server: McpServer, shellInstance: typeof shell, config: SecurityConfig) {
  // mkdir tool
  server.tool(
    "mkdir",
    "Create directories. Creates directory structure with optional support for creating intermediate directories.",
    MkdirParamsSchema.shape,
    async (params: MkdirParams): Promise<ToolResponse> => {
      try {
        const { dirs, options } = params;
        const dirsList = Array.isArray(dirs) ? dirs : [dirs];
        
        return await safeShellCommand(
          shellInstance.mkdir.bind(shellInstance),
          [options, ...dirsList],
          SecurityLevel.WRITE,
          config,
          "mkdir"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // touch tool
  server.tool(
    "touch",
    "Create or update file timestamps. Updates access/modification times of files, creates empty files if they don't exist.",
    TouchParamsSchema.shape,
    async (params: TouchParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.touch.bind(shellInstance),
          [options, ...filesList],
          SecurityLevel.WRITE,
          config,
          "touch"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // rm tool
  server.tool(
    "rm",
    "Remove files or directories. Deletes files with optional support for recursive directory removal.",
    RmParamsSchema.shape,
    async (params: RmParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.rm.bind(shellInstance),
          [options, ...filesList],
          SecurityLevel.WRITE,
          config,
          "rm"
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