import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDTO } from 'src/dto/loginDTO';
import { RegisterDTO } from 'src/dto/registerDTO';
import { responseDTO } from 'src/dto/responseDTO';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: loginDTO) {
    const data = await this.userService.login(
      loginDto.email,
      loginDto.password,
    );

    return { status: true, data: data };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDTO): Promise<responseDTO> {
    const checkUser = await this.userService.findByEmail(registerDto.email);

    if (checkUser !== null) {
      return { status: false, data: undefined };
    }

    const data = await this.userService.register(
      registerDto.fullName,
      registerDto.email,
      registerDto.password,
    );

    return { status: true, data: data };
  }
}
