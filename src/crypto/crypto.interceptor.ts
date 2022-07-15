import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CryptoLocator, RequestMapperLocator } from 'src/crypto/crypto.interface';
import { VisaException } from 'src/visa-mock/visa-mock.exception';

@Injectable()
export class CryptoInterceptor implements NestInterceptor {
  constructor(private readonly cryptoLocator: CryptoLocator, private readonly mapperLocator: RequestMapperLocator) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = await context.switchToHttp().getRequest<Request>();

    if (this.cryptoLocator.has(request) && this.mapperLocator.has(request)) {
      try {
        const cryptoService = this.cryptoLocator.get(request);
        const mapperService = this.mapperLocator.get(request);

        await mapperService.map(request, cryptoService);
      } catch (e) {
        throw VisaException.fromError(e);
      }
    }

    return next.handle();
  }
}
