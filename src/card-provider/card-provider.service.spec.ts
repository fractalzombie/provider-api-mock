import { Test, TestingModule } from '@nestjs/testing';
import { CardProviderServiceImpl } from 'src/card-provider/card-provider.service.impl';

describe('CardProviderService', () => {
  let service: CardProviderServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardProviderServiceImpl],
    }).compile();

    service = module.get<CardProviderServiceImpl>(CardProviderServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
