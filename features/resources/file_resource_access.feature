# Feature: File resource access
#
# The file resource provides access to file contents through MCP.
# It supports various parameters for accessing specific parts of files
# and handles error conditions consistently.

Feature: File resource access
  As an AI assistant using MCP
  I want reliable file content access
  So that I can analyze and work with file data effectively

  Background:
    Given the MCP-ShellJS server is running

  Scenario: Reading complete file content
    When I request a file resource without parameters
    Then I receive the complete file content
    And the response includes the file path

  Scenario: Reading file with line numbers
    When I request a file resource with lines=true
    Then I receive the file content with line numbers
    And each line is prefixed with its line number

  Scenario: Reading specific line range
    When I request a file resource with start=10 and end=20
    Then I receive only lines 10 through 20
    And the content excludes lines outside this range

  Scenario: Handling non-existent files
    When I request a non-existent file
    Then I receive an error response
    And the error indicates the file was not found

  Scenario: Handling directory paths
    When I request a directory path as a file
    Then I receive an error response
    And the error indicates the path is a directory not a file

  Scenario: Security boundary enforcement
    When I request a file outside allowed directories
    Then I receive a security error
    And the error explains the path is outside permitted boundaries