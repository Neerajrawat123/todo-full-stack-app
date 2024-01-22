import { ApiError } from "../utils/errorApi";


export function errorHandler (err: any, req: any, res: any, next: any) {
    let statusCode = 500;
    let message = "Internal Server Error";

    if(err instanceof ApiError ){

        statusCode = err.statusCode;
        message = err.message;
    }else{
        if (process.env.NODE_ENV !== "production") {
            if (typeof err === "string") {
              message = err;
            } else if (err instanceof Error) {
              message = err.message;
            }
          }
    }



    res.status(statusCode).send({
        error: {
          statusCode:statusCode,
          message: message,
          isSuccess:false
          
        },
      });

      return next(err)
    
}

