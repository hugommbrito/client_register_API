import { Router } from "express";
import { clientControllers } from "../controllers";

export const clientRouter = Router()

clientRouter.post('', clientControllers.create)
clientRouter.get('', clientControllers.read)
clientRouter.patch('/:id', clientControllers.update)
clientRouter.delete('/:id', clientControllers.deleter)