import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";


@Entity('tb_pacientes')
export class Paciente {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @MaxLength(50)
    @Column({ nullable: true, length: 50 })
    @ApiProperty()
    convenio: string

    @OneToOne(() => Cadastro, { onDelete: "CASCADE" })
    @JoinColumn()
    @ApiProperty({type: () => Cadastro})
    cadastro: Cadastro
}