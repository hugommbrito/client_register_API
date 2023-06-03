import { Router } from "express";
import { clientControllers } from "../controllers";
import { isEmailUniqueMdwr } from "../middlewares/isEmailUnique.middleware";
import { validateDataMdwr } from "../middlewares/validateData.Middleware";
import { clientSchemas } from "../schemas";

export const clientRouter = Router()

clientRouter.post('', validateDataMdwr(clientSchemas.postRequest), isEmailUniqueMdwr, clientControllers.create)
clientRouter.get('', clientControllers.read)
clientRouter.patch('/:id', validateDataMdwr(clientSchemas.update), clientControllers.update)
clientRouter.delete('/:id', clientControllers.deleter)