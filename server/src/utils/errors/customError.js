class ApplicationError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message ||
            'Something went wrong. Please try again.';

        this.status = status || 500;
    }
}

class UserError extends ApplicationError{
    constructor(message){
        super(message || "User error!", 400);
    }
}

class PermissionError extends ApplicationError {
    constructor(message) {
        super(message || "Permissions denied!", 403);
    }
}

class UnauthorizedError extends ApplicationError{
    constructor(message){
        super(message || "Unauthorized!", 401);
    }
}

module.exports.UserError = UserError;
module.exports.PermissionError = PermissionError;
module.exports.UnauthorizedError = UnauthorizedError;
