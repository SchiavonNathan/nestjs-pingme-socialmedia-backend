import { Controller, Get, Post, Param } from '@nestjs/common';
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
        return await this.likeService.getAllLikes();
    }

    @Public()
    @Get(":postagem_id")
    async getLikeById(@Param("postagem_id") postagem_id: number) {
        return await this.likeService.getLikeByPostagemId(postagem_id);
    }

    @Public()
    @Post(':postId/:userId')
    async toggleLike(@Param('postId') postId: number, @Param('userId') userId: number) {
        return await this.likeService.toggleLike(postId, userId);
    }
}
