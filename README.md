# MCP-ShellJS

A Master Control Program (MCP) server that enables Claude Desktop to safely interact with the host environment through ShellJS.

## Overview

MCP-ShellJS provides a controlled interface for AI systems like Claude to execute shell commands on the host system. It acts as a bridge between the AI and the operating system, offering a secure way to perform file operations, run commands, and interact with the local environment.

## Features

- Controlled shell access for AI assistants
- TypeScript implementation for type safety
- Configurable permissions and restrictions
- API for common file system operations
- Secure command execution

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-shelljs.git
cd mcp-shelljs

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

```typescript
// Import and initialize the MCP server
import { startMCPServer } from 'mcp-shelljs';

// Start the server with default configuration
startMCPServer();

// Or with custom configuration
startMCPServer({
  port: 3000,
  allowedCommands: ['ls', 'cat', 'echo'],
  workingDirectory: '/safe/directory/path'
});
```

## Security Considerations

This tool grants AI systems access to execute commands on your host system. Please use with caution:

- Always restrict the commands that can be executed
- Limit access to sensitive directories
- Run with minimal required permissions
- Consider using containerization for additional security
- Review the code and permissions before using in production

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test
```

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
