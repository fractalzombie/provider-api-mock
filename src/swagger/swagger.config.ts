import { registerAs } from '@nestjs/config';

export interface SwaggerConfiguration {
  title: string;
  path: string;
  description: string;
  version: string;
}

const factory = (): SwaggerConfiguration => ({
  title: process.env.SWAGGER_TITLE,
  path: process.env.SWAGGER_PATH,
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
});

export default registerAs('swagger', factory);
