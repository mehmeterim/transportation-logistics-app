import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

class JwtServiceMock {
  async signAsync(payload: any): Promise<string> {
    return 'mockToken';
  }
}

class UserModelMock {
  async findOne(condition: any): Promise<User> {
    return {
      fullName: 'Mock User',
      email: 'mock@example.com',
      password: await bcrypt.hash('mockPassword', 10),
    };
  }

  async create(user: User): Promise<User> {
    return user;
  }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: getModelToken(User.name), useClass: UserModelMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException when user is not found', async () => {
      await expect(
        service.login('nonexistent@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      await expect(
        service.login('mock@example.com', 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return an access token when login is successful', async () => {
      const result = await service.login('mock@example.com', 'mockPassword');
      expect(result.access_token).toEqual('mockToken');
    });
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const newUser = await service.register(
        'New User',
        'newuser@example.com',
        'password',
      );
      expect(newUser.fullName).toEqual('New User');
      expect(newUser.email).toEqual('newuser@example.com');
      expect(newUser.password).toBeDefined();
    });
  });
});
