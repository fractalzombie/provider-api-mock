import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export class CryptoLocatorError extends RuntimeException {
  public readonly context?: string;
  public readonly previous?: Error;

  constructor(args: { message: string; context?: string; previous?: Error }) {
    super(`${args.context}: ${args.message}`);
    this.context = args.context;
    this.previous = args.previous;
  }

  public static fromError(args: { context?: string; previous?: Error }): CryptoLocatorError {
    return new CryptoLocatorError({ message: args.previous?.message, context: args.context, previous: args.previous });
  }

  public static notFound(path: string): CryptoLocatorError {
    const message = `CryptoService for ${path} not found`;
    return new CryptoLocatorError({ message });
  }
}

export class RequestMapperLocatorError extends RuntimeException {
  public readonly context?: string;
  public readonly previous?: Error;

  constructor(args: { message: string; context?: string; previous?: Error }) {
    super(`${args.context}: ${args.message}`);
    this.context = args.context;
    this.previous = args.previous;
  }

  public static fromError(args: { context?: string; previous?: Error }): RequestMapperLocatorError {
    return new RequestMapperLocatorError({ message: args.previous?.message, context: args.context, previous: args.previous });
  }

  public static notFound(path: string): RequestMapperLocatorError {
    const message = `RequestMapper for ${path} not found`;
    return new RequestMapperLocatorError({ message });
  }
}
