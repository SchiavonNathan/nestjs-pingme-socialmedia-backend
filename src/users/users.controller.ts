import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "./DTO/users.dto";
import { Public } from "src/auth/constants";
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from "./users.service";


@Controller("users")
export class UsersController {

    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    @Public()
    @Get()
    getUsersList() {
        return this.userRepository.find();
    }

    @Get(":id")
    async getUserById(@Param("id") id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        return user;
    }

    @Public()
    @Post()
    createUser(@Body() userDto: UserDTO) {
        const user = this.userRepository.create();

        user.name = userDto.name;
        user.email = userDto.email;
        user.password = userDto.password;
        user.isActive = userDto.isActive;

        this.userRepository.save(user);

        return user;
    }

    @Delete(":id")
    async deleteUserById(@Param("id") id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        this.userRepository.delete({ id: user.id });
    }


    //GOOGLE ROTAS
    @Public()
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}


    @Public()
    @Get('googleredirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
    return this.usersService.googleLogin(req)
  }

}