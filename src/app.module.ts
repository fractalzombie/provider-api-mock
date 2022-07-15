import { Module } from '@nestjs/common';
import { SwaggerModule } from 'src/swagger';
import { VisaMockModule } from 'src/visa-mock';
import { CryptoModule } from 'src/crypto';

@Module({
  imports: [SwaggerModule, VisaMockModule, CryptoModule],
})
export class AppModule {}
