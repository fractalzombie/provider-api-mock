import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PanLifecycleModule } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.module';
import { VisaMockExceptionFilter } from 'src/visa-mock/visa-mock.exception.filter';

@Module({
  imports: [PanLifecycleModule],
  providers: [{ provide: APP_FILTER, useClass: VisaMockExceptionFilter }],
})
export class VisaMockModule {}
