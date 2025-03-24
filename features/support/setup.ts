import { setDefaultTimeout, Before, After } from '@cucumber/cucumber';
import { McpWorld } from '../step_definitions/world';

// Set default timeout for steps
setDefaultTimeout(60000);

// Initialize expect from jest
global.expect = require('expect');

// Reset state before each scenario
Before(function(this: McpWorld) {
  this.response = null;
  this.error = null;
  this.serverMode = 'read-only';
});

// Clean up after scenarios if needed
After(function(this: McpWorld) {
  // Add cleanup code here if necessary
});
