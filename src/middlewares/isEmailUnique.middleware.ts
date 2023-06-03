import { NextFunction, Request, Response } from "express";
import { iContactRepo } from "../interfaces/contact.interface";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities";
import { AppError } from "../error";

export const isEmailUniqueMdwr = async (req: Request, res: Response, next: NextFunction) => {
    const contactRepositoy: iContactRepo = AppDataSource.getRepository(Contact)
    const isEmail: boolean = await contactRepositoy.exist({
        where: {
            email: req.body.email
        }
    })

    if(isEmail){
        throw new AppError('Email já cadastrado na base de dados', 409)
    }
    
    return next()
}