import { Injectable } from '@nestjs/common';
import { CardProviderService } from 'src/card-provider';
import { PanLifecycleRequest } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.request';

@Injectable()
export class PanLifecycleService {
  constructor(private readonly cards: CardProviderService) {}

  async proceed(request: PanLifecycleRequest) {
    this.cards.getByPrimaryAccountNumber(request.encryptedData.cardholderInfo.primaryAccountNumber);
  }
}
