import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "./DTO/users.dto";
import { Public } from "src/auth/constants";
import { UsersService } from "./users.service";
import { UpdateUserDTO } from "./DTO/updateUser.dto";


@Controller("users")
export class UsersController {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly usersService: UsersService
    ) { }

    @Public()
    @Get()
    getUsersList() {
        return this.usersService.findAll();
    }

    @Public()
    @Get(":id")
    async getUserById(@Param("id") id: number) {
        return this.usersService.findOneById(id);
    }

    @Public()
    @Post()
    createUser(@Body() userDto: UserDTO) {
        return this.usersService.create(userDto);
    }
    
    @Public()
    @Put(':id') 
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDTO) {
        return this.usersService.update(id, updateUserDto);
    }


    @Delete(":id")
    async deleteUserById(@Param("id") id: number) {
        return this.usersService.delete(id);
    }

    @Public()
    @Post("googlelogin")
    async loginGoogle(@Req() req, @Res() res) {

        const { email, given_name, family_name, picture } = req.body;
        
        const response = await this.userRepository.find({where: { email }})
    
        if (response.length === 0){
        const user = await this.userRepository.create();
    
          const fullName = `${given_name} ${family_name}`;
    
          user.name = fullName
          user.email = email
          user.fotoPerfil = picture
    
        await this.userRepository.save(user)
        
        }
        
        const valida = await this.userRepository.find({where: { email }})
        
        return res.json(valida);
      }


}