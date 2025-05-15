import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Medico } from "../../medico/entities/medico.entity";
import { Cadastro } from "../entities/cadastro.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CadastroTemporarioMedicoDTO } from "../model/cadastrotemporariomedicodto";
import { matches } from "class-validator";

@Injectable()
export class CadastroService {

    constructor(
        @InjectRepository(Cadastro)
        private cadastroRepository: Repository<Cadastro>,

        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,

    ) { }


    async createMedico(cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {

        if (!cadastroTemporarioMedicoDTO.crm || !matches(cadastroTemporarioMedicoDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('Dados inválidos!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioMedicoDTO.email || !cadastroTemporarioMedicoDTO.email.includes("@")) {
            throw new HttpException('E-mail inválido!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let emailDisponivel = await this.findCadastroByEmail(cadastroTemporarioMedicoDTO.email)
        let cpfDisponivel = await this.findCadastroByCpf(cadastroTemporarioMedicoDTO.cpf)
        let crmDisponivel = await this.findMedicoByCrm(cadastroTemporarioMedicoDTO.crm)

        if(emailDisponivel || cpfDisponivel || crmDisponivel){
            throw new HttpException('Dados cadastrais já encontrados no sistema!', HttpStatus.BAD_REQUEST)
        }

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.email = cadastroTemporarioMedicoDTO.email
        cadastro.nome = cadastroTemporarioMedicoDTO.nome
        cadastro.cpf = cadastroTemporarioMedicoDTO.cpf
        cadastro.sobrenome = cadastroTemporarioMedicoDTO.sobrenome
        cadastro.senha = cadastroTemporarioMedicoDTO.senha
        
        medico.crm = cadastroTemporarioMedicoDTO.cpf
        medico.photoUrl = cadastroTemporarioMedicoDTO.photoUrl
        medico.type = cadastroTemporarioMedicoDTO.type
        medico.cpf = cadastroTemporarioMedicoDTO.cpf
        medico.instagram = cadastroTemporarioMedicoDTO.instagram
        medico.whatsapp = cadastroTemporarioMedicoDTO.whatsapp
        medico.website = cadastroTemporarioMedicoDTO.website

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)
    }

    findCadastroByCpf(cpf: string): Promise<Cadastro> {
        return this.cadastroRepository.findOne({
            where:{
                cpf
            }
        })
    }

    findCadastroByEmail(email: string): Promise<Cadastro> {
        return this.cadastroRepository.findOne({
            where:{
                email
            }
        })
    }

    async findAll(): Promise<Cadastro[]> {

        return this.cadastroRepository.find();
    }

    async findById(id: number): Promise<Cadastro> {

        let cadastroProcurado = this.cadastroRepository.findOne({
            where: {
                id
            }
        })

        if (!cadastroProcurado) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return cadastroProcurado
    }

    async findMedicoByCrm(crm: string): Promise<Medico> {

        const cadastroProcurado = this.medicoRepository.findOne({
            where: {
                cpf: crm
            }, relations: {
                cadastro: true
            }
        })

        if (!cadastroProcurado) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return cadastroProcurado
    }

    async delete(id: number): Promise<DeleteResult> {

        let cadastroDeletar = this.findById(id)

        if (!cadastroDeletar) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.cadastroRepository.delete(id)
    }

    async updateMedico(cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {

        let medicoUpdate = await this.findMedicoByCrm(cadastroTemporarioMedicoDTO.crm)

        if (!medicoUpdate || !cadastroTemporarioMedicoDTO.id) {
            throw new HttpException('Médico não encontrado!', HttpStatus.NOT_FOUND)
        } else if (!matches(cadastroTemporarioMedicoDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('CPF inválido!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioMedicoDTO.email || !cadastroTemporarioMedicoDTO.email.includes("@")) {
            throw new HttpException('E-mail inválido!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.id = medicoUpdate.cadastro.id
        cadastro.email = cadastroTemporarioMedicoDTO.email
        cadastro.nome = cadastroTemporarioMedicoDTO.nome
        cadastro.cpf = cadastroTemporarioMedicoDTO.cpf
        cadastro.sobrenome = cadastroTemporarioMedicoDTO.sobrenome
        cadastro.senha = cadastroTemporarioMedicoDTO.senha

        medico.id = medicoUpdate.id
        medico.cpf = cadastroTemporarioMedicoDTO.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)
    }

    async findByName(nome: string): Promise<Cadastro[]> {

        return this.cadastroRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        })
    }

    async findByEmail(email: string): Promise<Cadastro> {

        let cadastro = await this.cadastroRepository.findOne({
            where: {
                email
            }
        })

        if (!cadastro)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return cadastro
    }

    
}