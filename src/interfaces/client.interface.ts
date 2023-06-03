import { z } from 'zod'
import { clientSchemas } from '../schemas'
import { Repository } from 'typeorm'
import { Client } from '../entities'

export type iClientPost = z.infer<typeof clientSchemas.postRequest>
export type iClientReturned = z.infer<typeof clientSchemas.postReturn>
export type iClientCreate = z.infer<typeof clientSchemas.postCreate>
export type iClientUpdate = z.infer<typeof clientSchemas.update>

export type iClientRepo = Repository<Client>
