import { clientServices } from ".";
import { AppDataSource } from "../data-source";
import { Client, Contact } from "../entities";
import { iClientRepo } from "../interfaces/client.interface";
import { iContactInfo, iContactRepo, iContactReturned } from "../interfaces/contact.interface";
import contactSchema from "../schemas/contact.schema";

const create = async (payload: any): Promise<iContactReturned> => {
    const clientRepository: iClientRepo = AppDataSource.getRepository(Client)
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)

    const selectedClient: Client | null = await clientRepository.findOne({
        where: {
            name: payload.name
        }
    })

    if(selectedClient){
        const newContact: Contact = contactRepository.create(
            {
                email: payload.email,
                phone: payload.phone,
                client: selectedClient
            }
        )
        await contactRepository.save(newContact)

        const createdClient: Client | null = await clientRepository.findOne({
            where: {
                id: selectedClient.id
            },
            relations: {
                contacts: true
            }
        })
        return {
            message: `Contato adicionado ao cliente ${createdClient?.name}`,
            client: createdClient!
        }
    } else {
        return {
            message: `O cliente ${payload.name} foi criado e teve seu cotnato adicionado`,
            client: await clientServices.create(payload)
        }
    }


}

const read = async (): Promise<Contact[]> => {
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)
    let contactList: Contact[] = await contactRepository.find({})
    return contactList
}

const update = async (contactID: string, payload: any): Promise<iContactInfo> => {
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)
    const contactToUpdate = await contactRepository.findOne({
        where: {
            id: contactID
        }
    })

    const newContact = contactRepository.create(
        {
            ...contactToUpdate,
            ...payload
        }
    )

    await contactRepository.save(newContact)

    const updatedContact = contactSchema.contactInfo.parse(newContact)
    return updatedContact
}

const deleter = async (contactId: string): Promise<void> => {
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)
    const contactToDelete: Contact | null = await contactRepository.findOne({
        where: {
            id: contactId
        }
    })

    await contactRepository.remove(contactToDelete!)
}

export default { create, read, update, deleter}