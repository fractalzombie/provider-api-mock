import { Request } from 'express';
import { CardProviderMapper } from 'src/card-provider';
import { CryptoLocatorError } from 'src/crypto/crypto.exception';
import { CryptoLocator, CryptoService } from 'src/crypto/crypto.interface';

export class CryptoLocatorImpl implements CryptoLocator {
  constructor(private readonly services: Record<string, CryptoService>) {}

  get(request: Request): CryptoService {
    const service = this.services[CardProviderMapper.fromRequestPath(request.path)];

    if (!service) {
      throw CryptoLocatorError.notFound(request.path);
    }

    return service;
  }

  has(request: Request): boolean {
    return this.services.hasOwnProperty(CardProviderMapper.fromRequestPath(request.path));
  }
}
