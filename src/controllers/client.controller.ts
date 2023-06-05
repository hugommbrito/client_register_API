import { Request, Response } from "express";
import { iClientReturned } from "../interfaces/client.interface";
import { clientServices } from "../services";
import { Client } from "../entities";

const create = async (req: Request, res: Response): Promise<Response> => {
    const newClient: iClientReturned = await clientServices.create(req.body)
    return res.status(201).json(newClient)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const clientList: Client[] = await clientServices.read()
    return res.status(200).json(clientList)
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const updatedClient: iClientReturned = await clientServices.update(req.params.id, req.body)
    return res.status(200).json(updatedClient)
}

const deleter = async (req: Request, res: Response): Promise<Response> => {
    await clientServices.deleter(req.params.id)
    return res.status(204).send()
}

export default { create, read, update, deleter }