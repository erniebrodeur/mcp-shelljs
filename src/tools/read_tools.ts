import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Content } from "@modelcontextprotocol/sdk/types.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";

// Import schemas
import { LsParamsSchema, LsParams } from "../schemas/tool_params/ls";
import { PwdParamsSchema, PwdParams } from "../schemas/tool_params/pwd";
import { CatParamsSchema, CatParams } from "../schemas/tool_params/cat";
import { GrepParamsSchema, GrepParams } from "../schemas/tool_params/grep";
import { FindParamsSchema, FindParams } from "../schemas/tool_params/find";
import { WhichParamsSchema, WhichParams } from "../schemas/tool_params/which";
import { TestParamsSchema, TestParams } from "../schemas/tool_params/test";
import { HeadParamsSchema, HeadParams } from "../schemas/tool_params/head";
import { TailParamsSchema, TailParams } from "../schemas/tool_params/tail";
import { SortParamsSchema, SortParams } from "../schemas/tool_params/sort";
import { UniqParamsSchema, UniqParams } from "../schemas/tool_params/uniq";

export function registerReadTools(server: McpServer, shellInstance: typeof shell, config: SecurityConfig) {
  // Define descriptions
  const descriptions = {
    ls: "List directory contents. Shows files and directories with optional formatting and filtering.",
    pwd: "Print Working Directory. Shows the absolute path of the current directory.",
    cat: "Print file contents. Displays the content of one or more files concatenated.",
    grep: "Search files for patterns. Returns lines matching the specified pattern.",
    find: "Find files recursively. Returns all files (however deep) in the given paths.",
    which: "Locate a command. Shows the path to an executable in the system's PATH.",
    test: "Test file conditions. Evaluates condition like file existence or type.",
    head: "Show first lines. Display the beginning of files.",
    tail: "Show last lines. Display the end of files.",
    sort: "Sort lines. Returns the contents of files sorted line by line.",
    uniq: "Filter duplicate lines. Keep only unique lines from input."
  };
  // ls tool - List directory contents
  // Lists files and directories in the specified location with optional formatting
  server.tool(
    "ls",
    "List directory contents. Shows files and directories with optional formatting and filtering.",
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

  // pwd tool - Print Working Directory
  // Displays the absolute path of the current directory
  server.tool(
    "pwd",
    "Print Working Directory. Shows the absolute path of the current directory.",
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

  // grep tool
  server.tool(
    "grep",
    descriptions.grep,
    GrepParamsSchema.shape,
    async (params: GrepParams): Promise<ToolResponse> => {
      try {
        const { pattern, files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.grep.bind(shellInstance),
          [options, pattern, ...filesList],
          SecurityLevel.READ,
          config,
          "grep"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // find tool
  server.tool(
    "find",
    descriptions.find,
    FindParamsSchema.shape,
    async (params: FindParams): Promise<ToolResponse> => {
      try {
        const { paths, options } = params;
        const pathsList = Array.isArray(paths) ? paths : [paths];
        
        return await safeShellCommand(
          shellInstance.find.bind(shellInstance),
          pathsList,
          SecurityLevel.READ,
          config,
          "find"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // which tool
  server.tool(
    "which",
    descriptions.which,
    WhichParamsSchema.shape,
    async (params: WhichParams): Promise<ToolResponse> => {
      try {
        const { command, options } = params;
        
        return await safeShellCommand(
          shellInstance.which.bind(shellInstance),
          [command],
          SecurityLevel.READ,
          config,
          "which"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // test tool
  server.tool(
    "test",
    descriptions.test,
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

  // head tool
  server.tool(
    "head",
    descriptions.head,
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

  // tail tool
  server.tool(
    "tail",
    descriptions.tail,
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

  // sort tool
  server.tool(
    "sort",
    descriptions.sort,
    SortParamsSchema.shape,
    async (params: SortParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.sort.bind(shellInstance),
          [options, ...filesList],
          SecurityLevel.READ,
          config,
          "sort"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );

  // uniq tool
  server.tool(
    "uniq",
    descriptions.uniq,
    UniqParamsSchema.shape,
    async (params: UniqParams): Promise<ToolResponse> => {
      try {
        const { input, output, options } = params;
        const args = output ? [options, input, output] : [options, input];
        
        return await safeShellCommand(
          shellInstance.uniq.bind(shellInstance),
          args,
          SecurityLevel.READ,
          config,
          "uniq"
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