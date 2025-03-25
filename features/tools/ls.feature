# Feature: ls command for listing directory contents
#
# The ls command lists files and directories in the specified location.
# It accepts various options to control formatting and filtering of the output.
# Works in all security modes (read-only, read-write, exec).
#
# Options:
#   -R: Recursive listing of subdirectories
#   -A: Show all files (including hidden files beginning with .)
#   -L: Follow symbolic links
#   -d: List directories themselves, not their contents
#   -l: Long format with detailed file metadata
#
# Examples:
#   ls()                 -> Lists files in current directory
#   ls('src')            -> Lists files in src directory
#   ls('-la', '/tmp')    -> Lists all files in /tmp with details