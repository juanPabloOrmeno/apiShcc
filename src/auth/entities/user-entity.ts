import { Column, Entity } from "typeorm";



@Entity()
export class User {

    @Column( { primary: true, type: 'varchar', length: 11, nullable: false } )
    rut: string;

    @Column( { type: 'varchar', length: 100, nullable: false } )
    password: string;

    @Column( { type: 'varchar', length: 100, nullable: false } )
    email: string;

    @Column( { type: 'varchar', length: 100, nullable: false } )
    nombre: string;

    @Column( { type:  'boolean', default: true } )
    isActive: boolean;

    @Column( { type: 'varchar', length: 100, nullable: false } )
    rol: string;
}