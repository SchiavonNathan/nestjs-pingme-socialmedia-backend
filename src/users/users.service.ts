import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDTO } from './DTO/users.dto';
import { UpdateUserDTO } from './DTO/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    
    return user;
  }

  async create(user: UserDTO): Promise<User> {
    const userExist = await this.findOneByEmail(user.email);
    if (userExist) {
      throw new Error('Email já cadastrado');
    }

    const newUser = this.usersRepository.create(user);
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password;
    
    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDTO: UpdateUserDTO ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    user.name = updateUserDTO.name 
    user.biografia = updateUserDTO.biografia
    user.fotoPerfil = updateUserDTO.fotoPerfil

    await this.usersRepository.save(user);

    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    await this.usersRepository.remove(user);
  }
}
