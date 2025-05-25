import { Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'src/likes/likes.entity';
import { Postagem } from 'src/postagens/postagens.entity';
import { User } from 'src/users/users.entity';
import { Public } from 'src/auth/constants';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    constructor(
        private readonly likeService: LikesService, 
    ) {}

    @Public()
    @Get()
    async getAllLikes() {
        return this.likeService.getAllLikes();
    }

    @Public()
    @Get(":postagem_id")
    async getLikeById(@Param("postagem_id") postagem_id: number) {
        return this.likeService.getLikeByPostagemId(postagem_id);
    }

    @Public()
    @Post(':postId/:userId')
    async toggleLike(@Param('postId') postId: number, @Param('userId') userId: number) {
        return this.likeService.toggleLike(postId, userId);
    }
}
