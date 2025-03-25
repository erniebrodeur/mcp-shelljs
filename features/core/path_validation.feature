# Feature: Path validation and security
#
# The server validates all paths for security before allowing operations.
# This prevents directory traversal attacks, access to restricted system files,
# and ensures operations remain within allowed boundaries.

Feature: Path validation and security
  As an AI assistant using MCP
  I want robust path validation
  So that file operations cannot access unauthorized locations

  Background:
    Given the MCP-ShellJS server is running

  Scenario: Blocking directory traversal attempts
    When I attempt to access a path with "../" traversal
    Then the operation fails
    And I receive a security error about invalid path
    
  Scenario: Handling symlink resolution
    When I attempt to access a path that contains a symlink
    Then the server resolves the symlink appropriately
    And applies security checks to the resolved path
    
  Scenario: Path normalization for security
    When I access a path with unnecessary components like "/.//" 
    Then the server normalizes the path
    And applies security checks to the normalized path
    
  Scenario: Glob pattern validation
    When I use glob patterns with potential security issues
    Then the server validates the pattern
    And rejects unsafe glob patterns
    
  Scenario: Absolute path boundaries
    When I attempt to access system paths like "/etc/passwd"
    Then the operation fails
    And I receive a security error about path boundaries