import { Body, Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { PanLifecycleQueryRequest, PanLifecycleRequest } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.request';
import { PanLifecycleService } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.service';
import { VisaException } from 'src/visa-mock/visa-mock.exception';

@Controller('/vtis/v1/pan')
@ApiProduces('application/json')
@ApiConsumes('application/json')
export class PanLifecycleController {
  constructor(private readonly service: PanLifecycleService) {}

  @Post('/lifecycle')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: PanLifecycleRequest })
  public async lifecycle(@Body() request: PanLifecycleRequest, @Query() query: PanLifecycleQueryRequest): Promise<void> {
    try {
      await this.service.proceed(request);
    } catch (e) {
      throw VisaException.fromError(e);
    }
  }
}
