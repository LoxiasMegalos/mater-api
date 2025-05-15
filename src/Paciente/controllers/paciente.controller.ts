import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { Paciente } from "../entities/paciente.entity";
import { PacienteService } from "../services/paciente.service";

@ApiTags('Pacientes')
@Controller('/paciente')
export class PacienteController {

    constructor(
        private readonly service: PacienteService
    ) { }

    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Paciente[]> {
        return this.service.findAll()
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um paciente existente no banco de dados!',
        type: Number
      })
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Paciente> {
        return this.service.findById(id)
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'email',
        required: true,
        description: 'Tem de ser o email de um cadastro existente no banco de dados!',
        type: String
      })
    @Get('/busca-email/:email')
    @HttpCode(HttpStatus.OK)
    findPacienteByEmail(@Param('email') email: string): Promise<Paciente> {
        return this.service.findPacienteByEmail(email)
    }

}