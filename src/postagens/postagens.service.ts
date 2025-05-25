import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from './postagens.entity';
import { User } from 'src/users/users.entity';
import { Like } from "typeorm";
import slugify from 'slugify';
import { PostagemDTO } from './DTO/postagens.dto';

@Injectable()
export class PostagensService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll() {
        return this.postagemRepository.find({ relations: ["usuario"] });
    }

    async findOne(id: number) {
        return this.postagemRepository.findOne({
            where: { id },
            relations: ['likes'],
        });
    }

    async getPostagensById(id: number) {
        const postagem = await this.postagemRepository.findOne({ where: { id }, relations: ["usuario"] });
        if (!postagem) {
            throw new NotFoundException("Postagem não encontrada");
        }
        return postagem;
    }

    async getPostagensByUserId(userId: number) {
        const usuario = await this.userRepository.findOne({ where: { id: userId } });
        
        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado");
        }

        const postagens = await this.postagemRepository.find({
            where: { usuario: { id: userId } },
            relations: ["usuario"],
        });

        return postagens;
    }

    async getPostagemByTitulo(titulo: string) {
        const postagem = await this.postagemRepository.find({ where: { titulo: Like(`%${titulo}%`) },  relations: ["usuario"]});
        if (!postagem) {
            throw new NotFoundException("Postagem não encontrada");
        }
        return postagem;
    }

    async getPostagemForShare(id: number) {
        const postagem = await this.postagemRepository.findOne({where: {id}, relations: ["usuario"] });
        if (!postagem){
            throw new NotFoundException("Postagem não encontrada");
        }

        //gerar slug com base no título
        const slug = slugify(postagem.titulo, { lower: true});
        const shareUrl = `https://blog.com/postagens/${id}/${slug}`;

        return { shareUrl };
    }

    async create(postagemDto: PostagemDTO) {
        const usuario = await this.userRepository.findOne({ where: { id: postagemDto.usuario.id } });
        
        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado");
        }

        const postagem = new Postagem();
        postagem.titulo = postagemDto.titulo;
        postagem.conteudo = postagemDto.conteudo;
        postagem.tags = postagemDto.tags;
        postagem.slug = slugify(postagemDto.titulo, { lower: true });
        postagem.usuario = usuario;

        return this.postagemRepository.save(postagem);
    }

    async update(id: number, postagemDto: PostagemDTO) {
        const postagem = await this.postagemRepository.findOne({ where: { id }, relations: ["usuario"] });
        if (!postagem) {
            throw new NotFoundException("Postagem não encontrada");
        }

        const usuario = await this.userRepository.findOne({ where: { id: postagemDto.usuario.id } });
        
        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado");
        }

        this.postagemRepository.merge(postagem, postagemDto);
        postagem.usuario = usuario;
        postagem.slug = slugify(postagem.titulo, { lower: true });

        return this.postagemRepository.save(postagem);
    }

    async deletePostagemById(id: number) {
        const postagem = await this.postagemRepository.findOne({ where: { id } });
        if (!postagem) {
            throw new NotFoundException("Postagem não encontrada");
        }
        return this.postagemRepository.remove(postagem);
    }

    
}
