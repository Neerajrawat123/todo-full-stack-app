export class ApiError extends Error {
    statusCode: number;
    message: string ;
    success : boolean;
    errors: [] | undefined;
    stack?: string | undefined;

    constructor(
        message: string= "Something went wrong",
        statusCode: number,
        errors: [] = [],
        stack: string = ""
    ){
        super(message)
        this.message = message
        this.statusCode= statusCode
        this.success = false;
        this.errors = errors

        Error.captureStackTrace(this, this.constructor);

    }
}

