import { IsBoolean, IsEmail, IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserDTO {
    @IsOptional()
    name: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    password: string

    @IsOptional()
    @IsBoolean()
    isActive: boolean

    @IsOptional()
    @IsString()
    biografia: string;

    @IsOptional()
    @IsString()
    fotoPerfil: string;
}