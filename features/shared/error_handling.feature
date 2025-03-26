# Feature: Standardized error handling
#
# Central definition of all error patterns used across the application.
# All other feature files should reference these patterns.

Feature: Standardized error handling
  As an AI assistant using MCP
  I want consistent and informative error responses
  So that I can understand failures and fix issues

  # Resource Errors
  Scenario: Not found error pattern
    When I request a non-existent resource
    Then I receive a standardized not-found error
    And the error includes the path that was not found
    And the error has non-zero exit code

  Scenario: Type mismatch error pattern
    When I request a resource with incorrect type
    Then I receive a standardized type-mismatch error
    And the error indicates the expected vs actual type
    And the error has non-zero exit code

  # Permission Errors
  Scenario: Permission denial error pattern
    When I attempt an operation without required permission
    Then I receive a standardized permission error
    And the error indicates the required permission level
    And the error explains how to enable the required permission
    And the error has non-zero exit code

  # Parameter Errors
  Scenario: Parameter validation error pattern
    When I provide invalid parameters to a tool
    Then I receive a standardized parameter validation error
    And the error explains which parameter is invalid
    And the error provides guidance on correct usage
    And the error has non-zero exit code

  # System Errors
  Scenario: System error pattern
    When a system error occurs during an operation
    Then I receive a standardized system error
    And the error includes relevant system error details
    And the error is distinguishable from permission or validation errors
    And the error has non-zero exit code