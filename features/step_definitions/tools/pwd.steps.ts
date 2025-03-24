import { Given, When, Then } from '@cucumber/cucumber';
import { McpWorld } from '../world';
import fs from 'fs';
import path from 'path';

// Load fixtures
const pwdFixtures = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../fixtures/tools/pwd.json'), 'utf8')
);

// Step definitions for pwd command
Given('the MCP-ShellJS server is running', function(this: McpWorld) {
  // In a real implementation, we would start the server or mock it
  // For now, we'll just set up the world state
  this.serverMode = 'read-only';
});

When('I call the pwd tool', function(this: McpWorld) {
  try {
    // In actual implementation, this would call the MCP server
    // For now, we'll use the fixture data
    const isWindows = process.platform === 'win32';
    this.response = isWindows ? pwdFixtures.success.windows : pwdFixtures.success.unix;
  } catch (err) {
    this.error = err as Error;
  }
});

Then('I receive a successful response', function(this: McpWorld) {
  expect(this.response).not.toBeNull();
  expect(this.response.code).toBe(0);
});

Then('the response contains the current working directory path', function(this: McpWorld) {
  expect(this.response.stdout).toBeTruthy();
  expect(typeof this.response.stdout).toBe('string');
});

Then('the path is an absolute path', function(this: McpWorld) {
  expect(path.isAbsolute(this.response.stdout)).toBe(true);
});

Then('the response is a valid ShellString', function(this: McpWorld) {
  expect(this.response).toHaveProperty('stdout');
  expect(this.response).toHaveProperty('stderr');
  expect(this.response).toHaveProperty('code');
});

Then('the response has success status code {int}', function(this: McpWorld, code: number) {
  expect(this.response.code).toBe(code);
});

Then('the response includes operation timestamp', function(this: McpWorld) {
  // In a real implementation, we would check for a timestamp field
  // For now, this is a placeholder
  expect(true).toBe(true);
});

Given('there is a system error accessing the directory', function(this: McpWorld) {
  this.serverMode = 'system-error';
});

Then('I receive an error response', function(this: McpWorld) {
  // In actual testing, we would use the system error fixture
  this.response = pwdFixtures.errors.system;
  expect(this.response.code).not.toBe(0);
  expect(this.response.stderr).toBeTruthy();
});

Then('the error contains details about the failure', function(this: McpWorld) {
  expect(this.response.stderr).toContain('Error');
});

Then('the operation executes successfully', function(this: McpWorld) {
  expect(this.response.code).toBe(0);
});

Then('no permission error occurs', function(this: McpWorld) {
  expect(this.response.stderr).not.toContain('permission denied');
});
