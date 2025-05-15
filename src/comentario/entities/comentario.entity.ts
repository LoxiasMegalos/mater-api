import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity('tb_comentarios')
export class Comentario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @MaxLength(300)
    @MinLength(10)
    @Column({ nullable: false, length: 300 })
    @ApiProperty({
        description: 'Precisa de conter entre 10 e 300 caracteres.'
    })
    conteudo: string

    @IsNotEmpty()
    @Column({ nullable: false })
    @ApiProperty()
    dataComentario: Date

    @ManyToOne(() => Postagem, (postagem) => postagem.comentarios, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Postagem})
    postagem: Postagem

    @ManyToOne(() => Cadastro, (cadastro) => cadastro.comentarios, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Cadastro})
    cadastro: Cadastro
}