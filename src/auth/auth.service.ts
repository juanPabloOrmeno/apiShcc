import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user-entity';
import { JwtPayload } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  

  async crearUsuario(createUserDto: CreateUserDto) {

    try {

      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
      createUserDto.rol = createUserDto.rol || "user";

      const newUser = this.userRepository.create(createUserDto);
      const createdUser = await this.userRepository.save(newUser);
      return {
        user: createdUser.nombre,
        rut: createdUser.rut,
        rol: createdUser.rol,
        token: this.getJwtToken({ rut: createdUser.rut }) 
      };
    } catch (error) {
      this.handleExceptions(error);
    }

  }


  async loginUsuario(loginUserDto: LoginUserDto) {

    const { rut, password } = loginUserDto
    const busqueda = {
      "rut": rut
    }

    const user = await this.userRepository.findOneBy(busqueda)

    if (!user)
      throw new UnauthorizedException()

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException()

      return { 
        user: user.nombre,
        rut: user.rut,
        rol: user.rol,
        token: this.getJwtToken({ rut: user.rut }) 
      }
    
  }
  

  async cambiarEstadoUsuario(id: string) {
   
  }


  async cambiarPasswordUsuario(user: User, password: string) {
    
  }

  async getUserFromToken(user: User) {
    
  }

  async verUsuarios() {
    
  }

  async verTodosUsuarios() {
    
  }



  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }


  async checkAuthStatus( user: User ){
    return { token: this.getJwtToken({ rut: user.rut }) }
  }



  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`User exists in db ${JSON.stringify(error.keyValue)}`);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create User - Check server logs`);
  }
}
