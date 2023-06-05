import { NextFunction, Request, Response } from "express";
import { iContactRepo } from "../interfaces/contact.interface";
import { AppDataSource } from "../data-source";
import { Contact, Client } from "../entities";
import { AppError } from "../error";
import { iClientRepo } from "../interfaces/client.interface";

export const Contacts = async (req: Request, res: Response, next: NextFunction) => {
    const contactRepositoy: iContactRepo = AppDataSource.getRepository(Contact)
    const isContact: boolean = await contactRepositoy.exist({
        where: {
            id: req.params.id
        }
    })
    
    if(!isContact){
        throw new AppError('Contato não encontrado', 404)
    } else {
        return next()
    }

}

export const Clients = async (req: Request, res: Response, next: NextFunction) => {
    const clientRepositoy: iClientRepo = AppDataSource.getRepository(Client)
    const isClient: boolean = await clientRepositoy.exist({
        where: {
            id: req.params.id
        }
    })
    
    if(!isClient){
        throw new AppError('Cliente não encontrado', 404)
    } else {
        return next()
    }

}

export default { Contacts, Clients }