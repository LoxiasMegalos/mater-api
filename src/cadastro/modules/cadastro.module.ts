import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comentario } from "../../comentario/entities/comentario.entity";
import { Medico } from "../../medico/entities/medico.entity";
import { Paciente } from "../../Paciente/entities/paciente.entity";
import { CadastroController } from "../controllers/cadastro.controller";
import { Cadastro } from "../entities/cadastro.entity";
import { CadastroService } from "../services/cadastro.service";

@Module({
    imports: [TypeOrmModule.forFeature([Cadastro, Paciente, Medico, Comentario])],
    providers: [CadastroService],
    controllers: [CadastroController],
    exports: [TypeOrmModule]
}) export class CadastroModule { }