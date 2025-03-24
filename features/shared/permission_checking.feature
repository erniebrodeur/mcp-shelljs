# Feature: Permission checking for different operation modes

Feature: Permission checking
  As an AI assistant using MCP
  I want to know which operations are permitted
  So that I can work within appropriate security boundaries

  Background:
    Given the MCP-ShellJS server is running

  Scenario: Read-only operation permitted in all modes
    Given the server is in "read-only" mode
    When I attempt a read-only operation
    Then the operation executes successfully

  Scenario: Write operation blocked in read-only mode
    Given the server is in "read-only" mode
    When I attempt a write operation
    Then I receive a "permission denied" error
    And the error message explains write operations are disabled

  Scenario: Exec operation blocked without explicit permission
    Given the server is in "read-write" mode
    When I attempt an exec operation
    Then I receive a "permission denied" error
    And the error message explains exec requires special permission