import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/likes/likes.entity';
import { LikesController } from './likes.controller';
import { Postagem } from 'src/postagens/postagens.entity';
import { PostagensController } from 'src/postagens/postagens.controller';
import { User } from 'src/users/users.entity';
import { PostagensService } from 'src/postagens/postagens.service'; // Importar o PostagensService
import { UsersService } from 'src/users/users.service'; // Importar o UserService
import { LikesService } from './likes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Like, Postagem, User]), 
    ],
    controllers: [LikesController, PostagensController], 
    providers: [PostagensService, UsersService, LikesService], 
})
export class LikesModule {}
