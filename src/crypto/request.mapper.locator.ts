import { Request } from 'express';
import { CardProviderMapper } from 'src/card-provider';
import { RequestMapperLocatorError } from 'src/crypto/crypto.exception';
import { RequestMapper, RequestMapperLocator } from 'src/crypto/crypto.interface';

export class RequestMapperLocatorImpl implements RequestMapperLocator {
  constructor(private readonly services: Record<string, RequestMapper>) {}

  get(request: Request): RequestMapper {
    const service = this.services[CardProviderMapper.fromRequestPath(request.path)];

    if (!service) {
      throw RequestMapperLocatorError.notFound(request.path);
    }

    return service;
  }

  has(request: Request): boolean {
    return this.services.hasOwnProperty(CardProviderMapper.fromRequestPath(request.path));
  }
}
