import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne } from "typeorm"
import { Client } from "./client.entity"

@Entity('contacts')
export class Contact{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 45, unique: true})
    email: string

    @Column({ type: 'varchar', length: 11})
    phone: string

    @ManyToOne(() => Client, (client) => client.contacts)
    client: Client

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: string


}