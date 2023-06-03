import express, { Application } from "express"
import 'express-async-errors'
import 'reflect-metadata'
import { handleErrors } from "./error";
import { clientRouter } from "./routers/client.routes";
import { contactRouter } from "./routers/contact.routes";

const app: Application = express()
app.use(express.json())

app.use('/client', clientRouter)
app.use('/contact', contactRouter)

app.use(handleErrors)

export default app