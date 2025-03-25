# Feature: Standardized error handling
#
# The server provides consistent, informative error messages
# across all operations to help AI assistants understand
# the reason for failures and address issues propropriately.

Feature: Standardized error handling
  As an AI assistant using MCP
  I want consistent and informative error responses
  So that I can clearly understand failures and fix issues

  Background:
    Given the MCP-ShellJS server is running

  Scenario: Permission denial errors
    When I attempt an operation without required permission
    Then I receive a standardized permission error
    And the error indicates the required permission level
    And the error explains how to enable the required permission

  Scenario: Resource not found errors
    When I attempt to access a non-existent resource
    Then I receive a standardized not-found error
    And the error includes the path that was not found

  Scenario: Invalid parameter errors
    When I provide invalid parameters to a tool
    Then I receive a standardized parameter validation error
    And the error explains which parameter is invalid
    And the error provides guidance on correct usage

  Scenario: System errors
    When a system error occurs during an operation
    Then I receive a standardized system error
    And the error includes relevant system error details
    And the error is distinguishable from permission or validation errors