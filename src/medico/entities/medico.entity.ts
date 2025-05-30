import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity('tb_medicos')
export class Medico {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ApiProperty({
        description: 'Precisa de conter exatamente 11 caracteres'
    })
    @Length(11)
    @Column({ nullable: false, unique: true, length: 11 })
    cpf: string

    @ApiProperty({
        description: 'identification'
    })
    @Length(11)
    @Column({ nullable: false, unique: true, length: 11 })
    crm: string

    @ApiProperty({
    description: 'Instagram'
    })
    @Column({ nullable: false, unique: true})
    instagram: string

    @ApiProperty({
    description: 'Whatsapp'
    })
    @Column({ nullable: false, unique: true})
    whatsapp: string

    @ApiProperty({
    description: 'Type of medical specialty'
    })
    @Column({ nullable: false, unique: true})
    type: string

    @ApiProperty({
    description: 'Photo URL'
    })
    @Column({ nullable: false, unique: true})
    photoUrl: string

    @ApiProperty({
    description: 'Website'
    })
    @Column({ nullable: false, unique: true})
    website: string

    @OneToMany(() => Postagem, (postagem) => postagem.medico)
    @ApiProperty({type: () => Postagem})
    postagens: Postagem[]

    @OneToOne(() => Cadastro, { onDelete: "CASCADE" })
    @JoinColumn()
    @ApiProperty({type: () => Cadastro})
    cadastro: Cadastro
}