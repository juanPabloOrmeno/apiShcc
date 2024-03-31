import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user-entity';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUsuario(loginUserDto);
  }

  @Post('usuario')
  @Auth()
  usuario(@GetUser() user: User) {
    return this.authService.getUserFromToken(user);
  }

  @Post('crear')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.crearUsuario(createUserDto);
  }

  @Get('verUsuarios')
  @Auth()
  verUsuarios() {
    return this.authService.verUsuarios();
  }

  @Get('verTodosUsuarios')
  @Auth()
  verTodosUsuarios() {
    return this.authService.verTodosUsuarios();
  }

 
  @Post('cambiarEstadoUsuario')
  @Auth()
  cambiarEstadoUsuario(@Body('id') id: string) {
    return this.authService.cambiarEstadoUsuario(id);
  }

  @Post('cambioPassword')
  @Auth()
  cambioPassword(@GetUser() user: User, @Body('password') password: string) {
    return this.authService.cambiarPasswordUsuario(user, password);
  }
}
