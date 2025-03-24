# Feature: pwd command for displaying current working directory

Feature: pwd command
  As an AI assistant
  I want to use the pwd tool via MCP
  So that I can determine the current working directory in the user's system
  
  # Using shared features
  # - permission_checking.feature
  # - tool_validation.feature
  
  Background:
    Given the MCP-ShellJS server is running

  Scenario: Getting the current working directory
    When I call the pwd tool
    Then I receive a successful response
    And the response contains the current working directory path
    And the path is an absolute path

  Scenario: Response format verification
    When I call the pwd tool
    Then the response is a valid ShellString
    And the response contains a string value
    And the response has success status code 0
    And the response includes operation timestamp
    
  Scenario: Permission validation
    Given the server is in "read-only" mode
    When I call the pwd tool
    Then the operation executes successfully
    And no permission error occurs
    
  Scenario: Error handling on system failure
    Given there is a system error accessing the directory
    When I call the pwd tool
    Then I receive an error response
    And the error contains details about the failure
