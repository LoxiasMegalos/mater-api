import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Medico } from "../../medico/entities/medico.entity";
import { CadastroController } from "../controllers/cadastro.controller";
import { Cadastro } from "../entities/cadastro.entity";
import { CadastroService } from "../services/cadastro.service";

@Module({
    imports: [TypeOrmModule.forFeature([Cadastro, Medico])],
    providers: [CadastroService],
    controllers: [CadastroController],
    exports: [TypeOrmModule]
}) export class CadastroModule { }