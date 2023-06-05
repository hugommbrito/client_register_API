import { Router } from "express";
import { clientControllers } from "../controllers";
import { isEmailUniqueMdwr } from "../middlewares/isEmailUnique.middleware";
import { validateDataMdwr } from "../middlewares/validateData.Middleware";
import { clientSchemas } from "../schemas";
import ensureIdExistsMiddleware from "../middlewares/ensureIdExists.middleware";

export const clientRouter = Router()

clientRouter.post('', validateDataMdwr(clientSchemas.postRequest), isEmailUniqueMdwr, clientControllers.create)
clientRouter.get('', clientControllers.read)
clientRouter.patch('/:id', ensureIdExistsMiddleware.Clients, validateDataMdwr(clientSchemas.update), clientControllers.update)
clientRouter.delete('/:id', ensureIdExistsMiddleware.Clients, clientControllers.deleter)