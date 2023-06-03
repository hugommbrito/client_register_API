import { z } from 'zod'
import { contactSchemas } from '../schemas'
import { Repository } from 'typeorm'
import { Client, Contact } from '../entities'

export type iContactPost = z.infer<typeof contactSchemas.postRequest>
export type iContactInfo = z.infer<typeof contactSchemas.contactInfo>
export type iContactReturned = {
    message: string,
    client: Client
}

export type iContactRepo = Repository<Contact>
