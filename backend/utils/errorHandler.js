const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400, // invalid params from request (body or query)
    NOT_FOUND: 404, // element not found 
    INTERNAL_SERVER: 500, // error in database querys
    ACCESS_FAILED: 403, // invalid email or password ...
    AUTH_FAILD: 401 // authentication failed

}

class BaseError extends Error {

    constructor(name, httpCode, isOperational, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, message = 'internal server error') {
        super(name, httpCode, isOperational, message);
    }
}

class ErrorHandler {
    async handleError(err, res) {
        res.status(err.httpCode).send({
            status: "error",
            statusCode: err.httpCode,
            msg: err.message
        });
        console.log(
            'Error message from the centralized error-handling component',
            "\ncode ==== ", err.httpCode,
            "\nmsg === ", err.message,
            "\nopera ===", err.isOperational,
            "\nname ====", err.name

        );
    }

    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

class HTTP400Error extends BaseError {
    constructor(message = 'bad request') {
        super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, message);
    }
}

class HTTP401Error extends BaseError {
    constructor(message = 'Authentication error ') {
        super('ACCESS FAILED', HttpStatusCode.BAD_REQUEST, true, message);
    }
}

class HTTP403Error extends BaseError {
    constructor(message = 'access failed') {
        super('ACCESS FAILED', HttpStatusCode.BAD_REQUEST, true, message);
    }
}


class HTTP404Error extends BaseError {
    constructor(message = 'not Found') {
        super('NOT FOUND', HttpStatusCode.NOT_FOUND, true, message);
    }
}

class HTTP500Error extends BaseError {
    constructor(message = 'internal server') {
        super('INTERNAL SERVER', HttpStatusCode.INTERNAL_SERVER, true, message);
    }
}


module.exports = {
    errorHandler: new ErrorHandler(),
    APIError: APIError,
    HttpStatusCode: HttpStatusCode,
    HTTP400Error: HTTP400Error,
    HTTP404Error: HTTP404Error,
    HTTP500Error: HTTP500Error,
    HTTP403Error: HTTP403Error,
    HTTP401Error: HTTP401Error
}