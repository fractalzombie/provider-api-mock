import { CardProvider, CardStatus } from 'src/card-provider/card-provider.enum';

export interface CardData {
  provider: string;
  publicToken: string;
  primaryAccountNumber: string;
  cvv: string;
  expirationDate: string;
  status: string;
}

export class Card {
  provider: CardProvider;
  publicToken: string;
  primaryAccountNumber: string;
  cvv: string;
  expirationDate: Date;
  status: CardStatus;

  constructor(
    provider: CardProvider,
    publicToken: string,
    primaryAccountNumber: string,
    cvv: string,
    expirationDate: Date,
    status: CardStatus,
  ) {
    this.provider = provider;
    this.publicToken = publicToken;
    this.primaryAccountNumber = primaryAccountNumber;
    this.cvv = cvv;
    this.expirationDate = expirationDate;
    this.status = status;
  }

  static fromData(object: CardData) {
    return new Card(
      <CardProvider>object.provider,
      object.publicToken,
      object.primaryAccountNumber,
      object.cvv,
      new Date(Date.parse(object.expirationDate)),
      <CardStatus>object.status,
    );
  }
}

export abstract class CardProviderService {
  public abstract getByProvider(provider: CardProvider): Card[];
  /** @throws CardNotFoundException */
  public abstract getByPrimaryAccountNumber(primaryAccountNumber: string): Card;
}
