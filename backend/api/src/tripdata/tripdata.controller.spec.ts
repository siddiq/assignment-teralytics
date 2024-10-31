import { Test, TestingModule } from '@nestjs/testing';
import { TripdataController } from './tripdata.controller';

describe('TripdataController', () => {
  let controller: TripdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripdataController],
    }).compile();

    controller = module.get<TripdataController>(TripdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
