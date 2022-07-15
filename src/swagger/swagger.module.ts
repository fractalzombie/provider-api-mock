import { Global, INestApplication, Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule as BaseSwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './swagger.config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [swaggerConfig] })],
})
export class SwaggerModule implements OnModuleInit {
  private static _app: INestApplication;

  constructor(@Inject(swaggerConfig.KEY) private readonly config: ConfigType<typeof swaggerConfig>) {}

  onModuleInit(): void {
    const options = new DocumentBuilder()
      .setTitle(this.config.title)
      .setDescription(this.config.description)
      .setVersion(this.config.version)
      .build();

    BaseSwaggerModule.setup(this.config.path, SwaggerModule._app, BaseSwaggerModule.createDocument(SwaggerModule._app, options));
  }

  static set app(app: INestApplication) {
    this._app = app;
  }
}
