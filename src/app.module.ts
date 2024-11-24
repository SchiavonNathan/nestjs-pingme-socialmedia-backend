import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Postagem } from './postagens/postagens.entity';
import { PostagensModule } from './postagens/postagens.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { Comentario } from "src/comentarios/comentarios.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "unicesumar",
      password: "unicesumar",
      database: "blog",
      entities: [User, Postagem, Comentario],
      synchronize: true
    }),
    UsersModule,
    PostagensModule,
    AuthModule,
    ComentariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
