"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellStringToResponse = shellStringToResponse;
exports.createErrorResponse = createErrorResponse;
function shellStringToResponse(result, operationName) {
    const success = result.code === 0;
    const content = [{
            type: "text",
            text: result.stdout || ''
        }];
    const response = {
        content,
        isError: !success,
    };
    if (!success && result.stderr) {
        response.errorDetail = {
            code: result.code,
            message: result.stderr
        };
    }
    return response;
}
function createErrorResponse(message, code = 1) {
    return {
        content: [{
                type: "text",
                text: `Error: ${message}`
            }],
        isError: true,
        errorDetail: {
            code,
            message
        }
    };
}
