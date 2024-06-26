import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { PASSWORD_ROUNDS } from 'src/config/configuration';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  onModuleInit() {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });

    if (user === null) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      throw new UnauthorizedException();
    }

    const payload = { id: user?.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    fullName: string,
    email: string,
    password: string,
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, PASSWORD_ROUNDS);

    return this.userModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      email: email,
    });
  }
}
