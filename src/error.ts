import { NextFunction, Request, Response } from "express"
import { QueryFailedError } from "typeorm"
import { ZodError } from "zod"

class AppError extends Error {
    message: string
    statusCode: number

    constructor(message: string, statusCode: number = 400){
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

const handleErrors = (err: Error,  req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    if(err instanceof QueryFailedError){
        return res.status(400).json({
            message: err.message
        })
    }

    if(err instanceof ZodError){
        return res.status(400).json({message: err.flatten().fieldErrors})
    }

    console.log(err)
    return res.status(500).json({message: 'Internal Server Error!'})
}

export { AppError, handleErrors }