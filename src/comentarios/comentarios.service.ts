import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './comentarios.entity';
import { Postagem } from 'src/postagens/postagens.entity';
import { In, Repository } from 'typeorm';
import { ComentarioDTO } from './DTO/comentarios.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ComentariosService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        @InjectRepository(Comentario)
        private comentarioRepository: Repository<Comentario>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}


    async getComentariosList() {
        return this.comentarioRepository.find({ relations: ["usuario", "postagem"] });
    }

    async getComentarioById(id: number) {
        if (isNaN(id)) {
            throw new NotFoundException("O ID da postagem deve ser um número válido.");
        }

        const comentarios = await this.comentarioRepository.find({
            where: { postagem: { id: id } },
            relations: ["usuario", "postagem"],
        });
    
        return comentarios;
    }

    async createComentario(comentarioDTO: ComentarioDTO) {
        const usuario = await this.userRepository.findOneBy({ id: comentarioDTO.usuarioId });
        const postagem = await this.postagemRepository.findOneBy({ id: comentarioDTO.postagemId });
        
        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado");
        }
        if (!postagem) {
            throw new NotFoundException("Postagem não encontrado");
        }

        const comentario = this.comentarioRepository.create({
            ...comentarioDTO,
            usuario,
            postagem
        });

        return this.comentarioRepository.save(comentario);
    }

    async deleteComentario(id: number) {
        if (isNaN(id)) {
            throw new NotFoundException("O ID da postagem deve ser um número válido.");
        }

        const comentario = await this.comentarioRepository.findOneBy({ id: id });

        if (!comentario) {
            throw new NotFoundException("Comentário não encontrado");
        }

        return this.comentarioRepository.delete({ id: id });
    }
    
}
