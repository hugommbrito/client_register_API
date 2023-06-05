import { Router } from "express";
import { contactControllers } from "../controllers";
import { isEmailUniqueMdwr } from "../middlewares/isEmailUnique.middleware";
import { validateDataMdwr } from "../middlewares/validateData.Middleware";
import { contactSchemas } from "../schemas";
import ensureIdExists from '../middlewares/ensureIdExists.middleware'

export const contactRouter = Router()

contactRouter.post('', validateDataMdwr(contactSchemas.postRequest), isEmailUniqueMdwr, contactControllers.create)
contactRouter.get('', contactControllers.read)
contactRouter.patch('/:id', ensureIdExists.Contacts, validateDataMdwr(contactSchemas.patch), isEmailUniqueMdwr, contactControllers.update)
contactRouter.delete('/:id', ensureIdExists.Contacts, contactControllers.deleter)