import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './likes.entity';
import { Postagem } from 'src/postagens/postagens.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private likeRepository: Repository<Like>,
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllLikes(): Promise<Like[]> {
        const likes = await this.likeRepository.find({
            relations: ['postagem', 'usuario'],
        });
        return likes;
    }

    async getLikeByPostagemId(postagem_id: number): Promise<Like[]> {
        if (isNaN(postagem_id)) {
            throw new Error("O ID da postagem deve ser um número válido.");
        }

        const likes = await this.likeRepository.find({
            where: { postagem: { id: postagem_id } },
            relations: ["usuario", "postagem"],
        });

        return likes;
    }

    async toggleLike(postId: number, userId: number) {
        const postagem = await this.postagemRepository.findOne({ where: { id: postId } });
        const usuario = await this.userRepository.findOne({ where: { id: userId } });

        if (!postagem || !usuario) {
            throw new NotFoundException('Postagem ou usuário não encontrado');
        }

        const existingLike = await this.likeRepository.findOne({
            where: { postagem: { id: postId }, usuario: { id: userId } },
        });

        if (existingLike) {
            await this.likeRepository.delete(existingLike.id);
        } else {
            const like = this.likeRepository.create({ postagem, usuario });
            await this.likeRepository.save(like);
        }

        const likesCount = await this.likeRepository.count({
            where: { postagem: { id: postId } },
        });

        await this.postagemRepository.update(postId, { likesCount });

        return likesCount
    }
    
}
