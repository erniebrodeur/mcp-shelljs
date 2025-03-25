# Feature: Directory resource access
#
# The directory resource provides directory listings through MCP.
# It supports various parameters for filtering and formatting directory contents
# and handles error conditions consistently.

Feature: Directory resource access
  As an AI assistant using MCP
  I want reliable directory listing access
  So that I can navigate the filesystem effectively

  Background:
    Given the MCP-ShellJS server is running

  Scenario: Basic directory listing
    When I request a directory resource without parameters
    Then I receive a listing of the directory contents
    And the listing includes files and subdirectories

  Scenario: Filtered directory listing with include pattern
    When I request a directory with include="*.js"
    Then I receive only files matching the pattern
    And no non-matching files are included

  Scenario: Filtered directory listing with exclude pattern
    When I request a directory with exclude="node_modules"
    Then I receive files and directories excluding the pattern
    And no matching items are included

  Scenario: Recursive directory listing
    When I request a directory with recursive=true
    Then I receive a listing including subdirectory contents
    And the contents maintain proper hierarchy information

  Scenario: Directory listing respecting .gitignore
    When I request a directory with honor_gitignore=true
    Then I receive a listing excluding .gitignore patterns
    And the response respects the .gitignore rules

  Scenario: Handling non-existent directories
    When I request a non-existent directory
    Then I receive an error response
    And the error indicates the directory was not found

  Scenario: Handling file paths
    When I request a file path as a directory
    Then I receive an error response
    And the error indicates the path is a file not a directory