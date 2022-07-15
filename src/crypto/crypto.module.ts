import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import cryptoConfig from 'src/crypto/crypto.config';
import { CryptoInterceptor } from 'src/crypto/crypto.interceptor';
import { CryptoLocator, RequestMapperLocator } from 'src/crypto/crypto.interface';
import { CryptoLocatorImpl } from 'src/crypto/crypto.locator';
import { RequestMapperLocatorImpl } from 'src/crypto/request.mapper.locator';
import { VisaRequestMapper } from 'src/crypto/visa-request.mapper';
import { VisaCryptoService } from 'src/crypto/visa-crypto.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [cryptoConfig] })],
  providers: [
    VisaCryptoService,
    VisaRequestMapper,
    { provide: CryptoLocator, useFactory: (vcs) => new CryptoLocatorImpl({ [vcs.getType()]: vcs }), inject: [VisaCryptoService] },
    {
      provide: RequestMapperLocator,
      useFactory: (vrm) => new RequestMapperLocatorImpl({ [vrm.getType()]: vrm }),
      inject: [VisaRequestMapper],
    },
    { provide: APP_INTERCEPTOR, useClass: CryptoInterceptor },
  ],
  exports: [VisaCryptoService, VisaRequestMapper, RequestMapperLocator, CryptoLocator],
})
export class CryptoModule {}
