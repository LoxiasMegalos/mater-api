import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CadastroService } from "../services/cadastro.service";
import { DeleteResult } from "typeorm";
import { Cadastro } from "../entities/cadastro.entity";
import { Paciente } from "../../Paciente/entities/paciente.entity";
import { Medico } from "../../medico/entities/medico.entity";
import { Comentario } from "../../comentario/entities/comentario.entity";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { CadastroTemporarioPacienteDTO } from "../model/cadastrotemporariopacientedto";
import { CadastroTemporarioMedicoDTO } from "../model/cadastrotemporariomedicodto";

@ApiTags('Cadastros')
@Controller('/cadastro')
export class CadastroController {

    constructor(
        private readonly service: CadastroService
    ) { }
    
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioMedicoDTO',
        type: CadastroTemporarioMedicoDTO
    })
    @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @Post('/medico')
    @HttpCode(HttpStatus.CREATED)
    createMedico(@Body() cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {
        return this.service.createMedico(cadastroTemporarioMedicoDTO)
    }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioPacienteDTO',
        type: CadastroTemporarioPacienteDTO
    })
    @ApiCreatedResponse({ description: 'Created Succesfully' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @Post('/paciente')
    @HttpCode(HttpStatus.CREATED)
    createPaciente(@Body() cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {
        return this.service.createPaciente(cadastroTemporarioPacienteDTO)
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um cadastro existente no banco de dados!',
        type: Number
    })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiNoContentResponse({ description: 'Content not found' })
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }  

    @ApiParam({
        name: 'email',
        required: true,
        description: 'Tem de ser o email de um cadastro existente no banco de dados!',
        type: String
    })
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get('/busca-email/:email')
    @HttpCode(HttpStatus.OK)
    findByEmail(@Param('email') email: string): Promise<Cadastro> {
        return this.service.findByEmail(email)
    }

    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cadastro[]> {
        return this.service.findAll()
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um cadastro existente no banco de dados!',
        type: Number
    })
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get('/comentarios/:id')
    @HttpCode(HttpStatus.OK)
    findComentariosByCadastroId(@Param('id', ParseIntPipe) id: number): Promise<Comentario[]> {
        return this.service.findComentariosByCadastroId(id)
    }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioMedicoDTO e não é possível alterar o CRM',
        type: CadastroTemporarioMedicoDTO
    })
    @ApiOkResponse({ description: 'The resource was updated successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @Put('/medico')
    @HttpCode(HttpStatus.OK)
    updateMedico(@Body() cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {
        return this.service.updateMedico(cadastroTemporarioMedicoDTO)
    }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioPacienteDTO',
        type: CadastroTemporarioPacienteDTO
    })
    @ApiOkResponse({ description: 'The resource was updated successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @Put('/paciente')
    @HttpCode(HttpStatus.OK)
    updatePaciente(@Body() cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {
        return this.service.updatePaciente(cadastroTemporarioPacienteDTO)
    }
}