# MCP-ShellJS

An MCP server that provides safe, controlled ShellJS access for LLMs like Claude.

## Overview

MCP-ShellJS bridges the Model Context Protocol (MCP) with ShellJS, enabling AI systems to execute shell commands within a secure sandbox. It provides controlled filesystem access with multiple security layers.

## Features

- **Simplified security**:
  - Read-only mode by default
  - Optional read-write mode via command line flag
  - Optional exec permission via command line flag
- Schema-based validation with Zod
- Full ShellJS functionality (`ls`, `grep`, `sed`, `find`, etc.)
- TypeScript implementation with strong typing
- Simple API for LLM integration

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

### Command Line
```bash
# Default mode (read-only)
node dist/index.js

# Enable read-write operations
node dist/index.js --enable-rw

# Enable exec command (careful!)
node dist/index.js --enable-exec

# Enable both
node dist/index.js --enable-rw --enable-exec
```

### TypeScript Integration
```typescript
// Import and initialize the MCP server
import { startMCPServer } from 'mcp-shelljs';

// Start the server with default configuration (read-only)
startMCPServer();

// Or with custom security configuration
startMCPServer({
  enableRw: true,   // Enable read-write operations
  enableExec: false // Keep exec disabled
});
```

## Security Design

MCP-ShellJS implements a simple security model:

1. **Read-Only Mode** (Default): Only commands that don't modify the filesystem are available
2. **Read-Write Mode** (`--enable-rw`): Enables commands that can create, modify, or delete files
3. **Exec Mode** (`--enable-exec`): Enables the potentially dangerous `exec` command for executing arbitrary shell commands

The server runs with stdio transport only, making it suitable for integration with desktop LLM applications.

## Why Use MCP-ShellJS?

For AI developers, MCP-ShellJS enables powerful filesystem capabilities with controlled risk:

- **Efficient exploration**: Fast search with `grep` and `find` across codebases
- **Text processing**: Transform files with `sed` without loading them entirely
- **Safe automation**: Let AI help with file organization and management
- **Powerful pipelines**: Chain operations with Unix-style piping

## Resources

### Directory Resource

```
directory://{path}?include={glob}&exclude={glob}&honor_gitignore={boolean}
```

Provides directory listing with powerful filtering capabilities:

| Parameter | Description |
|-----------|-------------|
| `include` | Glob pattern(s) to include (e.g., `*.js,*.ts`) |
| `exclude` | Glob pattern(s) to exclude (e.g., `node_modules,dist`) |
| `honor_gitignore` | When `true`, filters out files matching patterns in .gitignore |
| `recursive` | When `true`, includes subdirectories recursively |

**Example:**
```
directory:///project/src?include=*.ts&exclude=*.test.ts&honor_gitignore=true
```

### File Resource

```
file://{path}?lines={boolean}&start={number}&end={number}
```

Provides file contents with options for viewing specific portions:

| Parameter | Description |
|-----------|-------------|
| `lines` | When `true`, includes line numbers in output |
| `start` | First line to include (1-based indexing) |
| `end` | Last line to include |
| `highlight` | Glob pattern to highlight matching text |

**Example:**
```
file:///project/src/index.ts?lines=true&start=10&end=50
```

## Tools

MCP-ShellJS exposes ShellJS commands as tools, grouped by security risk level:

### Read-Only Tools

| Tool | Description | Arguments |
|------|-------------|----------|
| `cat` | Output file contents | `files`: String/Array, `options`: Object with `-n` (number lines) |
| `grep` | Search files for patterns | `regex`, `files`, `options`: Object with `-v` (invert), `-l` (filenames only), `-i` (ignore case) |
| `find` | Recursively find files | `paths`: String/Array (returns file paths including base dirs) |
| `ls` | List directory contents | `paths`: String/Array, `options`: Object with `-R` (recursive), `-A` (all), `-L` (follow symlinks), `-d` (dirs only) |
| `which` | Locate a command | `command`: String (returns path to command) |
| `pwd` | Print working directory | (no arguments) |
| `test` | Test file conditions | `expression`: String (e.g., `-d path` directory exists, `-f path` file exists) |
| `head` | Show first lines | `files`: String/Array, `options`: Object with `-n <num>` (lines to show) |
| `tail` | Show last lines | `files`: String/Array, `options`: Object with `-n <num>` (lines to show) |
| `sort` | Sort lines | `files`: String/Array, `options`: Object with `-r` (reverse), `-n` (numeric) |
| `uniq` | Filter duplicated lines | `input`: String, `output`: String, `options`: Object with `-i` (ignore case), `-c` (count), `-d` (duplicates only) |

### Read-Write Tools

| Tool | Description | Arguments |
|------|-------------|----------|
| `mkdir` | Create directories | `dir`: String/Array, `options`: Object with `-p` (create intermediate dirs) |
| `touch` | Create/update files | `files`: String/Array, `options`: Object with `-c` (no create), `-a` (access time only), `-m` (mod time only) |
| `cp` | Copy files/directories | `source`: String/Array, `dest`: String, `options`: Object with `-R` (recursive), `-n` (no clobber), `-f` (force) |
| `mv` | Move files/directories | `source`: String/Array, `dest`: String, `options`: Object with `-f` (force), `-n` (no clobber) |
| `rm` | Remove files/directories | `files`: String/Array, `options`: Object with `-r/-R` (recursive), `-f` (force) |
| `sed` | Stream editor for files | `search_regex`: RegExp, `replacement`: String, `files`: String/Array, `options`: Object with `-i` (in-place) |

### Special Permission Tools

| Tool | Description | Arguments |
|------|-------------|----------|
| `exec` | Execute command | `command`: String, `options`: Object with `async`, `silent`, requires `allowExec: true` config |

## License

[GPL-3.0-or-later](LICENSE)
