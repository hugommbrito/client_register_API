import { Router } from "express";
import { contactControllers } from "../controllers";

export const contactRouter = Router()

contactRouter.post('', contactControllers.create)
contactRouter.get('', contactControllers.read)
contactRouter.patch('/:id', contactControllers.update)
contactRouter.delete('/:id', contactControllers.deleter)