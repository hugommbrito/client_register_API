import { z } from 'zod'
import { Client } from '../entities'

const postRequest = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    phone: z.string().max(11)
})

const contactInfo = postRequest.extend({
    id: z.string(),
    createdAt: z.string().or(z.date())
}).omit({
    name: true
})

const postReturn = {
    message: z.string(),
    client: Client}

const patch = postRequest.partial()

export default { postRequest, postReturn, patch, contactInfo }