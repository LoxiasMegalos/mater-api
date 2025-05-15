import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";

export class CadastroTemporarioPacienteDTO {

    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Length(11)
    @ApiProperty()
    cpf: string

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty()
    sobrenome: string

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty()
    senha: string

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty()
    email: string

    @MaxLength(50)
    @ApiProperty()
    convenio: string
}