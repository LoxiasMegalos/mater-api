import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";

export class CadastroTemporarioMedicoDTO {

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

    @MaxLength(13)
    @ApiProperty()
    crm: string

    @ApiProperty()
    whatsapp: string

    @ApiProperty()
    website: string

    @ApiProperty()
    instagram: string
    
}