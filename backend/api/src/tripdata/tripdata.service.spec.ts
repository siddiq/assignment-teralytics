import { Test, TestingModule } from '@nestjs/testing';
import { TripdataService } from './tripdata.service';

describe('TripdataService', () => {
  let service: TripdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripdataService],
    }).compile();

    service = module.get<TripdataService>(TripdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
