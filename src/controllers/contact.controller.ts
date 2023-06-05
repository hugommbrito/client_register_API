import { Request, Response } from "express";
import { iClientReturned } from "../interfaces/client.interface";
import { clientServices, contactServices } from "../services";
import { Client, Contact } from "../entities";
import { iContactInfo, iContactReturned } from "../interfaces/contact.interface";

const create = async (req: Request, res: Response): Promise<Response> => {
    const newContact: iContactReturned = await contactServices.create(req.body)
    return res.status(201).json(newContact)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const contactList: Contact[] = await contactServices.read()
    return res.status(200).json(contactList)
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const updatedContact: iContactInfo = await contactServices.update(req.params.id, req.body)
    return res.status(200).json(updatedContact)
}

const deleter = async (req: Request, res: Response): Promise<Response> => {
    await contactServices.deleter(req.params.id)
    return res.status(204).send()
}

export default { create, read, update, deleter }