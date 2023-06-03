import { AppDataSource } from "../data-source";
import { Client, Contact } from "../entities";
import { iClientCreate, iClientPost, iClientRepo, iClientReturned } from "../interfaces/client.interface";
import { iContactRepo } from "../interfaces/contact.interface";
import { clientSchemas } from "../schemas";

const create = async (payload: iClientPost): Promise<Client> => {
    const clientRepository: iClientRepo = AppDataSource.getRepository(Client)
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)

    let newClient: Client = clientRepository.create({name: payload.name})
    await clientRepository.save(newClient)
    
    let newContact: Contact = contactRepository.create(
        {
            ...payload,
            client: newClient,
        }
    )
    await contactRepository.save(newContact)

    const createdClient: Client | null = await clientRepository.findOne({
        where: {
            id: newClient.id
        },
        relations: {
            contacts: true
        }
    })
    return createdClient!
}

const read = async (): Promise<Client[]> => {
    const clientRepository: iClientRepo = AppDataSource.getRepository(Client)
    let clientList = await clientRepository.find({
        relations: {
            contacts: true
        }
    })

    return clientList
}

const update = async (clientID: string, payload: any): Promise<iClientReturned> => {
    const clientRepository: iClientRepo = AppDataSource.getRepository(Client)
    const clientToUpdate = await clientRepository.findOne({
        where: {
            id: clientID
        },
        relations: {
            contacts: true
        }
    })

    const newClient = clientRepository.create(
        {
            ...clientToUpdate,
            ...payload
        }
    )

    await clientRepository.save(newClient)

    const updatedClient = clientSchemas.postReturn.parse(newClient)
    return updatedClient
}

const deleter = async (clientId: string): Promise<void> => {
    const clientRepository: iClientRepo = AppDataSource.getRepository(Client)
    const ClientToDelete: Client | null = await clientRepository.findOne(
        {
            where: {
                id: clientId
            }
        }
    )

    await clientRepository.remove(ClientToDelete!)
}

export default { create, read, update, deleter }