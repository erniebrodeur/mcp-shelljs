# Feature: Security boundaries
#
# Comprehensive security boundary testing combining path validation
# and permission level enforcement in a single feature.

Feature: Security boundaries
  As an AI assistant using MCP
  I want well-defined security boundaries
  So that operations remain safe and contained

  # Permission Levels
  Scenario: Read operations in all security modes
    Given the server is running in any security mode
    When I perform a read operation
    Then the operation succeeds
    And I receive appropriate content

  Scenario: Write operations in read-only mode
    Given the server is in "read-only" mode
    When I attempt a write operation
    Then the operation fails with permission error
    And the error explains write operations require "--enable-rw" flag

  Scenario: Write operations in read-write mode
    Given the server is in "read-write" mode
    When I perform a write operation
    Then the operation succeeds
    And the filesystem is modified as expected

  Scenario: Exec operations in read-write mode
    Given the server is in "read-write" mode
    When I attempt an exec operation
    Then the operation fails with permission error
    And the error explains exec operations require "--enable-exec" flag

  Scenario: Exec operations in exec mode
    Given the server is in "exec" mode
    When I perform an exec operation
    Then the operation succeeds
    And the command executes as expected

  # Path Validation
  Scenario: Directory traversal prevention
    When I attempt to access a path with "../" traversal
    Then the operation fails with security error
    And the error explains directory traversal is not allowed

  Scenario: Path normalization
    When I access a path with unnecessary components like "/.//"
    Then the server normalizes the path
    And applies security checks to the normalized path
    
  Scenario: System path protection
    When I attempt to access system paths like "/etc/passwd"
    Then the operation fails with security error
    And the error explains the path is outside allowed boundaries
    
  Scenario: Symlink resolution
    When I attempt to access a path with a symlink
    Then the server resolves the symlink appropriately
    And applies security checks to the resolved target