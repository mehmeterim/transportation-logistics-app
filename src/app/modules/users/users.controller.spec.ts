import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { getModelToken } from '@nestjs/mongoose';

// Mock JwtService
class JwtServiceMock {}

// Mock UserModel
class UserModelMock {}

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: getModelToken('User'), useClass: UserModelMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return user data when valid login credentials are provided', async () => {
      const loginDto = { email: 'test@example.com', password: 'password' };
      const mockUserData = {
        id: 1,
        fullName: 'Test User',
        email: 'test@example.com',
      };
      jest.spyOn(service, 'login').mockResolvedValue(mockUserData);

      const result = await controller.login(loginDto);

      expect(result).toEqual(mockUserData);
    });
  });

  describe('register', () => {
    it('should return newly registered user data', async () => {
      const registerDto = {
        fullName: 'New User',
        email: 'newuser@example.com',
        password: 'password',
      };
      const mockNewUser = { id: 2, ...registerDto }; // Assuming the service returns the newly created user data
      jest.spyOn(service, 'register').mockResolvedValue(mockNewUser);

      const result = await controller.register(registerDto);

      expect(result).toEqual(mockNewUser);
    });
  });
});
