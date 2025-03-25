# Feature: Security level enforcement
#
# The server enforces different security levels (read-only, read-write, exec)
# for operations based on their potential risk. This ensures safe operation
# and prevents unauthorized access or modifications.

Feature: Security level enforcement
  As an AI assistant using MCP
  I want clear security boundaries enforced
  So that operations can be performed safely based on authorized permissions

  Background:
    Given the MCP-ShellJS server is running

  Scenario: Read operations allowed in read-only mode
    Given the server is in "read-only" mode
    When I perform a read operation
    Then the operation succeeds
    And I receive appropriate content

  Scenario: Write operations blocked in read-only mode
    Given the server is in "read-only" mode
    When I attempt a write operation
    Then the operation fails
    And I receive a "permission denied" error
    And the error explains write operations require explicit permission

  Scenario: Exec operations blocked in read-write mode
    Given the server is in "read-write" mode
    When I attempt an exec operation
    Then the operation fails
    And I receive a "permission denied" error
    And the error explains exec operations require explicit permission

  Scenario: Write operations allowed in read-write mode
    Given the server is in "read-write" mode
    When I perform a write operation
    Then the operation succeeds
    And the filesystem is modified as expected

  Scenario: Exec operations allowed in exec mode
    Given the server is in "exec" mode
    When I perform an exec operation
    Then the operation succeeds
    And the command executes as expected

  Scenario: Security escalation requirements
    Given the server is in "read-only" mode
    When I request a security escalation without proper flags
    Then the escalation is denied
    And I receive information about required command-line flags