import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { Tema } from "../entities/tema.entity";
import { TemaService } from "../services/tema.service";

@ApiTags('Temas')
@Controller('/tema')
export class TemaController {

    constructor(
        private readonly service: TemaService
    ) { }
    
    @ApiOkResponse({ description: 'The resources were returned successfully'})
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]> {
        return this.service.findAll()
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um tema existente no banco de dados!',
        type: Number
    })
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
        return this.service.findById(id)
    }

    @ApiCreatedResponse({ description: 'Criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tema: Tema): Promise<Tema> {
        return this.service.create(tema)
    }

    @ApiOkResponse({ description: 'O recurso foi atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no Tema e apresentar o ID de um tema existente no banco de dados.',
        type: Tema
    })
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() tema: Tema): Promise<Tema> {
        return this.service.update(tema)
    }

    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiNoContentResponse({ description: 'O recurso foi deletado com sucesso!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um tema existente no banco de dados!',
        type: Number
    })
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }
}