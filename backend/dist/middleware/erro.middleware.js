"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function erroMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
        status,
        message,
    });
}
exports.default = erroMiddleware;
//# sourceMappingURL=erro.middleware.js.map