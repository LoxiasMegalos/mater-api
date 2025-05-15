import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { Medico } from "../entities/medico.entity";
import { MedicoService } from "../services/medico.service";

@ApiTags('Medicos')
@Controller('/medico')
export class MedicoController {
    constructor(
        private readonly service: MedicoService
    ) { }
    
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Medico[]> {
        return this.service.findAll()
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um médico existente no banco de dados!',
        type: Number
    })
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Medico> {
        return this.service.findById(id)
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'email',
        required: true,
        description: 'Tem de ser o Email de um médico existente no banco de dados!',
        type: String
    })
    @Get('/busca-email/:email')
    @HttpCode(HttpStatus.OK)
    findMedicoByEmail(@Param('email') email: string): Promise<Medico> {
        return this.service.findMedicoByEmail(email)
    }
}

