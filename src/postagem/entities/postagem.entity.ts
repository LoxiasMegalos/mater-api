import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Medico } from "../../medico/entities/medico.entity";
import { Tema } from "../../tema/entities/tema.entity";

@Entity('tb_postagens')
export class Postagem {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ApiProperty({
        description: 'Pode conter no máximo 255 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(20)
    @Column({ nullable: false, length: 255 })
    titulo: string

    @ApiProperty({
        description: 'Pode conter entre 20 e 5000 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(5000)
    @MinLength(20)
    @Column({ nullable: false, length: 5000 })
    descricao: string

    @ApiProperty({
        description: 'Pode conter entre 10 e 500 caracteres'
    })
    @IsNotEmpty()
    @MaxLength(500)
    @MinLength(10)
    @Column({ nullable: false, length: 500 })
    anexo: string

    @IsNotEmpty()
    @Column({ nullable: false })
    @ApiProperty()
    dataPostagem: Date

    @ManyToOne(() => Tema, (tema) => tema.postagens, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Tema})
    tema: Tema

    @ManyToOne(() => Medico, (medico) => medico.postagens, {
        onDelete: "CASCADE"
    })
    @ApiProperty({type: () => Medico})
    medico: Medico

}