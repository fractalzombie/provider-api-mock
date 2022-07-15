import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CardProvider, CardStatus } from 'src/card-provider/card-provider.enum';
import { CardBlockedException, CardExpiredException, CardNotFoundException } from 'src/card-provider/card-provider.exception';
import { Card, CardData, CardProviderService } from 'src/card-provider/card-provider.interface';

@Injectable()
export class CardProviderServiceImpl implements CardProviderService {
  private readonly cards: Card[];

  public constructor(cards: CardData[]) {
    this.cards = cards.map(Card.fromData);
  }

  public getByProvider(provider: CardProvider): Card[] {
    return this.cards.filter((c) => c.provider === provider);
  }

  public getByPrimaryAccountNumber(primaryAccountNumber: string): Card {
    const card = this.cards.filter((c) => c.primaryAccountNumber === primaryAccountNumber).at(0);

    if (!card) {
      throw new CardNotFoundException();
    }

    if (card.expirationDate > new Date() || card.status === CardStatus.Expired) {
      throw new CardExpiredException();
    }

    if (card.status === CardStatus.Blocked) {
      throw new CardBlockedException();
    }

    return card;
  }
}
