
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Contact } from "./contact.entity"

@Entity('clients')
export class Client{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar'})
    name: string

    @OneToMany(() => Contact, (contact) => contact.client, {onDelete: "CASCADE"})
    contacts: Contact[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: string

}