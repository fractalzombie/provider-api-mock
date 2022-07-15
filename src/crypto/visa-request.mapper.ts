import { Request } from 'express';
import { CardProvider } from 'src/card-provider';
import { RequestMapper, CryptoService } from 'src/crypto/crypto.interface';

export class VisaRequestMapper implements RequestMapper {
  async map(request: Request, crypto: CryptoService): Promise<void> {
    if (request.body.hasOwnProperty(this.getEncryptedKey())) {
      request.body[this.getEncryptedKey()] = await crypto.decrypt(request.body[this.getEncryptedKey()]);
    }
  }

  getType(): CardProvider {
    return CardProvider.Visa;
  }

  getEncryptedKey(): string | symbol {
    return 'encryptedData';
  }
}
