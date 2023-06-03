import { Router } from "express";
import { contactControllers } from "../controllers";
import { isEmailUniqueMdwr } from "../middlewares/isEmailUnique.middleware";
import { validateDataMdwr } from "../middlewares/validateData.Middleware";
import { contactSchemas } from "../schemas";

export const contactRouter = Router()

contactRouter.post('', validateDataMdwr(contactSchemas.postRequest), isEmailUniqueMdwr, contactControllers.create)
contactRouter.get('', contactControllers.read)
contactRouter.patch('/:id', validateDataMdwr(contactSchemas.patch), isEmailUniqueMdwr, contactControllers.update)
contactRouter.delete('/:id', contactControllers.deleter)