import { IsNotEmpty, IsOptional, IsString, MaxLength, IsInt } from "class-validator";
import { User } from "src/users/users.entity";

export class PostagemDTO {
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    titulo: string;

    @IsNotEmpty()
    @IsString()
    conteudo: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    tags?: string;

    usuario: User

    @IsOptional()
    slug?: string; 

    @IsOptional()
    foto: string;
}
