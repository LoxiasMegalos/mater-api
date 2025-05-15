
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { Comentario } from "../entities/comentario.entity";
import { ComentarioDTO } from "../models/comentarioDTO";
import { ComentarioService } from "../services/comentario.service";

@ApiTags('Comentarios')
@Controller('/comentario')
export class ComentarioController {

    constructor(
        private readonly service: ComentarioService
    ) { }
    
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Comentario[]> {
        return this.service.findAll()
    }

    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get('/:id')
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um comentário existente no banco de dados!',
        type: Number
    })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
        return this.service.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados em um Comentario',
        type: Comentario
    })
    @ApiCreatedResponse({ description: 'Criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    create(@Body() comentario: Comentario): Promise<Comentario> {
        return this.service.create(comentario)
    }
    
    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados em um Comentario e apresentar o ID de um ' +
         'comentário existente no banco de dados',
        type: Comentario
    })
    @ApiOkResponse({ description: 'O recurso foi atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    update(@Body() comentario: Comentario): Promise<Comentario> {
        return this.service.update(comentario)
    }
    
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiNoContentResponse({ description: 'O recurso foi deletado com sucesso!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um comentário existente no banco de dados!',
        type: Number
    })
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }

    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @Get('/postagem/:id')
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de uma postagem existente no banco de dados!',
        type: Number
    })
    @HttpCode(HttpStatus.OK)
    findComentariosByPostagem(@Param('id', ParseIntPipe) id: number): Promise<Comentario[]> {
        return this.service.findComentariosByPostagem(id)
    }
}