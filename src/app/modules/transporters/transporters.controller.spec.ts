import { Test, TestingModule } from '@nestjs/testing';
import { TransportersController } from './transporters.controller';

describe('TransportersController', () => {
  let controller: TransportersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportersController],
    }).compile();

    controller = module.get<TransportersController>(TransportersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
