import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from './postagens.entity';
import { Like } from 'src/likes/likes.entity';

@Injectable()
export class PostagensService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        @InjectRepository(Like)
        private likeRepository: Repository<Like>
    ) {}

    findAll() {
        return this.postagemRepository.find();
    }

    findOne(id: number) {
        return this.postagemRepository.findOne({
            where: { id },
            relations: ['likes'],
        });
    }

    create(postagem: Postagem) {
        return this.postagemRepository.save(postagem);
    }

    async update(id: number, postagem: Partial<Postagem>) {
        await this.postagemRepository.update(id, postagem);
        return this.findOne(id);
    }

    delete(id: number) {
        return this.postagemRepository.delete(id);
    }

    
}
