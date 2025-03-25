"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupResources = setupResources;
const file_resource_1 = require("./file_resource");
const directory_resource_1 = require("./directory_resource");
function setupResources(server, config) {
    (0, file_resource_1.registerFileResource)(server, config);
    (0, directory_resource_1.registerDirectoryResource)(server, config);
}
