import { Test, TestingModule } from '@nestjs/testing';
import { PanLifecycleController } from 'src/visa-mock/pan-lifecycle/pan-lifecycle.controller';

describe('VisaMockController', () => {
  let controller: PanLifecycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanLifecycleController],
    }).compile();

    controller = module.get<PanLifecycleController>(PanLifecycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
