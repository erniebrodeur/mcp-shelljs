# Feature: Directory resource
#
# The directory resource provides directory listings through MCP.
# This feature focuses on unique directory resource functionality.

Feature: Directory resource
  As an AI assistant using MCP
  I want directory listing functionality
  So that I can navigate the filesystem effectively

  # Core Functionality  
  Scenario: Basic directory listing
    When I request a directory resource without parameters
    Then I receive a listing of the directory contents
    And the listing includes files and subdirectories

  Scenario: Filtered listing with include pattern
    When I request a directory with include="*.js"
    Then I receive only files matching the pattern
    And no non-matching files are included

  Scenario: Filtered listing with exclude pattern
    When I request a directory with exclude="node_modules"
    Then I receive files and directories excluding the pattern
    And no matching items are included

  Scenario: Recursive directory listing
    When I request a directory with recursive=true
    Then I receive a listing including subdirectory contents
    And the contents maintain proper hierarchy information

  Scenario: Respecting .gitignore
    When I request a directory with honor_gitignore=true
    Then I receive a listing excluding .gitignore patterns
    And the response respects the .gitignore rules

  # Error cases defined in shared features
  # See error_handling.feature and security_boundaries.feature