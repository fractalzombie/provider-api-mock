import { Module } from '@nestjs/common';
import { CardProviderModule } from 'src/card-provider';
import { PanLifecycleController } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.controller';
import { PanLifecycleService } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.service';

@Module({
  imports: [CardProviderModule],
  controllers: [PanLifecycleController],
  providers: [PanLifecycleService],
})
export class PanLifecycleModule {}
