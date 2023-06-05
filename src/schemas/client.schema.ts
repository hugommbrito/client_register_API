import { z } from 'zod'
import contactsSchema from './contact.schema'

const postRequest = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    phone: z.string().max(11)
})

const postCreate = postRequest.omit({
    email:true,
    phone: true
})

const postReturn = postCreate.extend({
    id: z.string(),
    createdAt: z.string().or(z.date()),
    contacts: z.array(contactsSchema.contactInfo)
})

const update = postRequest.pick({
    name: true
})

export default { postRequest, postReturn, postCreate, update }