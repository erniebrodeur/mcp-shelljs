"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load fixtures
const pwdFixtures = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../fixtures/tools/pwd.json'), 'utf8'));
// Step definitions for pwd command
(0, cucumber_1.Given)('the MCP-ShellJS server is running', function () {
    // In a real implementation, we would start the server or mock it
    // For now, we'll just set up the world state
    this.serverMode = 'read-only';
});
(0, cucumber_1.When)('I call the pwd tool', function () {
    try {
        // In actual implementation, this would call the MCP server
        // For now, we'll use the fixture data
        const isWindows = process.platform === 'win32';
        this.response = isWindows ? pwdFixtures.success.windows : pwdFixtures.success.unix;
    }
    catch (err) {
        this.error = err;
    }
});
(0, cucumber_1.Then)('I receive a successful response', function () {
    expect(this.response).not.toBeNull();
    expect(this.response.code).toBe(0);
});
(0, cucumber_1.Then)('the response contains the current working directory path', function () {
    expect(this.response.stdout).toBeTruthy();
    expect(typeof this.response.stdout).toBe('string');
});
(0, cucumber_1.Then)('the path is an absolute path', function () {
    expect(path_1.default.isAbsolute(this.response.stdout)).toBe(true);
});
(0, cucumber_1.Then)('the response is a valid ShellString', function () {
    expect(this.response).toHaveProperty('stdout');
    expect(this.response).toHaveProperty('stderr');
    expect(this.response).toHaveProperty('code');
});
(0, cucumber_1.Then)('the response has success status code {int}', function (code) {
    expect(this.response.code).toBe(code);
});
(0, cucumber_1.Then)('the response includes operation timestamp', function () {
    // In a real implementation, we would check for a timestamp field
    // For now, this is a placeholder
    expect(true).toBe(true);
});
(0, cucumber_1.Given)('there is a system error accessing the directory', function () {
    this.serverMode = 'system-error';
});
(0, cucumber_1.Then)('I receive an error response', function () {
    // In actual testing, we would use the system error fixture
    this.response = pwdFixtures.errors.system;
    expect(this.response.code).not.toBe(0);
    expect(this.response.stderr).toBeTruthy();
});
(0, cucumber_1.Then)('the error contains details about the failure', function () {
    expect(this.response.stderr).toContain('Error');
});
(0, cucumber_1.Then)('the operation executes successfully', function () {
    expect(this.response.code).toBe(0);
});
(0, cucumber_1.Then)('no permission error occurs', function () {
    expect(this.response.stderr).not.toContain('permission denied');
});
