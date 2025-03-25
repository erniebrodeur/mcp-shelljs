"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
// Set default timeout for steps
(0, cucumber_1.setDefaultTimeout)(60000);
// Initialize expect from jest
global.expect = require('expect');
// Reset state before each scenario
(0, cucumber_1.Before)(function () {
    this.response = null;
    this.error = null;
    this.serverMode = 'read-only';
});
// Clean up after scenarios if needed
(0, cucumber_1.After)(function () {
    // Add cleanup code here if necessary
});
