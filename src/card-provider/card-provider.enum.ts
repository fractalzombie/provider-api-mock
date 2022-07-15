export enum CardProvider {
  Visa = 'Visa',
  MasterCard = 'MasterCard',
  Unknown = 'Unknown',
}

export class CardProviderMapper {
  public static fromRequestPath(path: string): CardProvider {
    switch (true) {
      case path.includes('/vtis/'):
        return CardProvider.Visa;
      case path.includes('/mdes/'):
        return CardProvider.MasterCard;
      default:
        return CardProvider.Unknown;
    }
  }
}

export enum CardStatus {
  Expired = 'expired',
  Blocked = 'blocked',
  Activated = 'activated',
}
