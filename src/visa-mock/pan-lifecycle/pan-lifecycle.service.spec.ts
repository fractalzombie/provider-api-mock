import { Test, TestingModule } from '@nestjs/testing';
import { PanLifecycleService } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.service';

describe('VisaMockService', () => {
  let service: PanLifecycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanLifecycleService],
    }).compile();

    service = module.get<PanLifecycleService>(PanLifecycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
