# Feature: Common validation patterns for tools

Feature: Tool Validation
  As an AI assistant using MCP
  I want consistent tool responses
  So that I can reliably interpret and use the results
  
  Background:
    Given the MCP-ShellJS server is running

  Scenario: Standard response structure
    When I call any tool
    Then the response has a standardized structure
    And the response includes operation status code
    And the response includes operation timestamp
    And the response includes a valid ShellString
    
  Scenario: ShellString properties
    When I receive a ShellString response
    Then it has a toString() method
    And it has .stdout, .stderr, and .code properties
    
  Scenario: Parameter validation
    When I call a tool with invalid parameters
    Then the response includes validation error details
    And the error message identifies the invalid parameter
    And the response indicates failure status
    
  Scenario: Missing required parameters
    When I call a tool without required parameters
    Then the response indicates parameter requirement error
    And the response lists the missing required parameters
    
  Scenario: Asynchronous operation handling
    When I call a tool that performs async operations
    Then the response correctly resolves after completion
    And the response maintains consistent structure
