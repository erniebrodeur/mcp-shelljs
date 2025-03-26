# Feature: File resource
#
# The file resource provides access to file contents through MCP.
# This feature focuses on unique file resource functionality.

Feature: File resource
  As an AI assistant using MCP
  I want file content access functionality
  So that I can read and analyze files effectively

  # Core Functionality
  Scenario: Reading complete file content
    When I request a file resource without parameters
    Then I receive the complete file content
    And the response includes the file URI

  Scenario: Reading file with line numbers
    When I request a file resource with lines=true
    Then I receive the file content with line numbers
    And each line is prefixed with its line number

  Scenario: Reading specific line range
    When I request a file resource with start=10 and end=20
    Then I receive only lines 10 through 20
    And the content excludes lines outside this range

  Scenario: Line highlighting
    When I request a file with highlight="pattern"
    Then I receive the file content
    And matching patterns are highlighted in the response

  # Error cases defined in shared features
  # See error_handling.feature and security_boundaries.feature