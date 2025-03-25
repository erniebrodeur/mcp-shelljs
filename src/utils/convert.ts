import { ShellString } from 'shelljs';
import { Content } from '@modelcontextprotocol/sdk/types.js';
import { ToolResponse } from './shell';

export function shellStringToResponse(result: ShellString, operationName: string): ToolResponse {
  const success = result.code === 0;
  
  const content: Content[] = [{
    type: "text",
    text: result.stdout || ''
  }];
  
  const response: ToolResponse = {
    content,
    isError: !success,
  };
  
  if (!success && result.stderr) {
    response.errorDetail = {
      code: result.code,
      message: result.stderr
    };
  }
  
  return response;
}

export function createErrorResponse(message: string, code: number = 1): ToolResponse {
  return {
    content: [{
      type: "text",
      text: `Error: ${message}`
    }],
    isError: true,
    errorDetail: {
      code,
      message
    }
  };
}