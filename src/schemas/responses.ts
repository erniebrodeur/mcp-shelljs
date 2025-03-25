import { z } from 'zod';
import { Content } from '@modelcontextprotocol/sdk/types.js';

// Tool response schema
export const ToolResponseSchema = z.object({
  content: z.array(z.object({
    type: z.literal('text'),
    text: z.string()
  })),
  isError: z.boolean().optional(),
  errorDetail: z.object({
    code: z.number(),
    message: z.string()
  }).optional()
});

export type ToolResponse = z.infer<typeof ToolResponseSchema>;

// Resource content item schema
export const ResourceContentSchema = z.object({
  uri: z.string(),
  text: z.string()
});

// Resource response schema
export const ResourceResponseSchema = z.object({
  contents: z.array(ResourceContentSchema),
  isError: z.boolean().optional()
});

export type ResourceResponse = z.infer<typeof ResourceResponseSchema>;
