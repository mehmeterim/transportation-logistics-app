import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDTO } from 'dto/loginDTO';
import { RegisterDTO } from 'dto/registerDTO';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: loginDTO) {
    return this.userService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return this.userService.register(
      registerDto.fullName,
      registerDto.email,
      registerDto.password,
    );
  }
}
