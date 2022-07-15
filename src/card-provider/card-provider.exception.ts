import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export class CardNotFoundException extends RuntimeException {}
export class CardExpiredException extends RuntimeException {}
export class CardBlockedException extends RuntimeException {}
