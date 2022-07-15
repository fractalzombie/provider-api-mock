import { Module } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CardProviderService } from 'src/card-provider/card-provider.interface';
import { CardProviderServiceImpl } from 'src/card-provider/card-provider.service.impl';

@Module({
  providers: [
    {
      provide: CardProviderServiceImpl,
      useFactory: () =>
        new CardProviderServiceImpl(JSON.parse(readFileSync(join(process.cwd(), 'data', 'cards.json'), { encoding: 'utf-8' }))),
    },
    {
      provide: CardProviderService,
      useFactory: (service) => service,
      inject: [CardProviderServiceImpl],
    },
  ],
  exports: [CardProviderServiceImpl, CardProviderService],
})
export class CardProviderModule {}
