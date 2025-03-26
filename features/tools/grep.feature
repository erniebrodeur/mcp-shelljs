# Feature: grep command for searching file contents
#
# The grep command searches files for patterns and returns matching lines.
# It accepts various options to control the search behavior and output format.
# Works in read-only mode and does not modify files.
#
# Options:
#   -v: Invert the match (only print non-matching lines)
#   -l: Print only filenames of matching files
#   -i: Ignore case
#   -n: Print line numbers
#
# Examples:
#   grep('pattern', 'file.txt')           -> Returns lines containing 'pattern'
#   grep('-i', 'pattern', '*.js')         -> Case-insensitive search in all .js files
#   grep('-l', 'pattern', ['a.js', 'b.js']) -> Returns only filenames with matches

Feature: grep command
  As an AI assistant using MCP
  I want to search files for patterns
  So that I can find relevant information quickly

  Background:
    Given the MCP-ShellJS server is running

  Scenario: Basic pattern search
    When I search for pattern "function" in "src/index.js"
    Then I receive lines containing the pattern
    And the response is a valid ShellString

  Scenario: Case-insensitive search
    When I search with -i for pattern "function" in "src/index.js"
    Then I receive lines containing "function", "Function", or any case variation
    And the response is a valid ShellString

  Scenario: Inverted match search
    When I search with -v for pattern "function" in "src/index.js"
    Then I receive lines that do NOT contain the pattern
    And the response is a valid ShellString

  Scenario: Filename-only output
    When I search with -l for pattern "function" in "src/*.js"
    Then I receive only filenames of matching files
    And no file content is included in the response

  Scenario: Line number output
    When I search with -n for pattern "function" in "src/index.js"
    Then I receive lines containing the pattern
    And each line is prefixed with its line number

  Scenario: Multiple file search
    When I search for pattern "function" in multiple files
    Then I receive matches from all files
    And each match indicates which file it came from

  Scenario: Searching with glob patterns
    When I search for pattern "function" in "src/*.js"
    Then I receive matches from all JavaScript files in the src directory

  Scenario: Searching non-existent files
    When I search for pattern "function" in a non-existent file
    Then I receive an error response
    And the error indicates the file was not found

  Scenario: Regular expression pattern
    When I search with regex pattern "/^\\s*function/" in "src/index.js"
    Then I receive lines starting with function declarations
    And the response is a valid ShellString

  Scenario: Security boundary enforcement
    When I attempt to search in files outside allowed directories
    Then I receive a security error
    And the error explains the path is outside permitted boundaries