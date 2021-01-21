const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
}

class BaseError extends Error {

    constructor(name, httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, isOperational, description);
    }
}

class ErrorHandler {
    async handleError(err, res) {
        res.status(err.httpCode).json({
            status: "error",
            statusCode: err.httpCode,
            msg: err.description
        });
        console.log(
            'Error message from the centralized error-handling component',
            err,
        );
    }

    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

module.exports = {
    errorHandler: new ErrorHandler(),
    APIError: APIError,
    HttpStatusCode: HttpStatusCode
}