import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "./postagens.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PostagemDTO } from "./DTO/postagens.dto";
import { Public } from "src/auth/constants";
import { User } from "src/users/users.entity";
import { PostagensService } from "./postagens.service";
import slugify from "slugify";
import { Like } from "typeorm";

@Controller("postagens")
export class PostagensController {
    constructor(
        private postagensService: PostagensService,
    ) { }

    @Public()
    @Get()
    async getPostagensList() {
        return await this.postagensService.findAll();
    }

    @Public()
    @Get(":id")
    async getPostagemById(@Param("id") id: number) {
        return await this.postagensService.getPostagensById(id);
    }

    @Public()
    @Get("/usuario/:userId")
    async getPostagensByUserId(@Param("userId") userId: number) {
        return await this.postagensService.getPostagensByUserId(userId);
    }

    @Public()
    @Get("/search/:titulo")
    async getPostagemByTitulo(@Param("titulo") titulo: string) {
        return await this.postagensService.getPostagemByTitulo(titulo);
    }

    @Public()
    @Get("/share/:id")
    async getPostagemForShare(@Param("id") id:number){
        return await this.postagensService.getPostagemForShare(id);
    }

    @Public()
    @Post()
    async createPostagem(@Body() postagemDto: PostagemDTO) {
        return await this.postagensService.create(postagemDto);
    }

    @Public()
    @Put(":id")
    async updatePostagem(@Param("id") id: number, @Body() postagemDto: PostagemDTO) {
        return await this.postagensService.update(id, postagemDto);
    }

    @Public()
    @Delete(":id")
    async deletePostagemById(@Param("id") id: number) {
        return await this.postagensService.deletePostagemById(id);
    }

}
