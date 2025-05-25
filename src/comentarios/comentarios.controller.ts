import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ComentarioDTO } from "../comentarios/DTO/comentarios.dto";
import { Public } from "src/auth/constants";
import { ComentariosService } from './comentarios.service';


@Controller('comentarios')
export class ComentariosController {
    constructor(
        private readonly comentarioService: ComentariosService,
    ) {}

    @Public()
    @Get()
    async getComentariosList(){
        return await this.comentarioService.getComentariosList();
    }

    @Public()
    @Get(":postagem_id")
    async getComentarioById(@Param("postagem_id") postagem_id: number) {
        return await this.comentarioService.getComentarioById(postagem_id);
    }

    @Public()
    @Post()
    async createComentario(@Body() comentarioDTO: ComentarioDTO){
        return await this.comentarioService.createComentario(comentarioDTO);
    }

    @Public()
    @Delete(":id")
    async deletarComentario(@Param("id") id: number){
        return await this.comentarioService.deleteComentario(id);
    }
}
