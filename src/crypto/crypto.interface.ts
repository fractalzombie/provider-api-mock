import { Request } from 'express';
import { CardProvider } from 'src/card-provider';

export abstract class CryptoService {
  public abstract encrypt(payload: object): Promise<string>;
  public abstract decrypt(payload: string): Promise<object>;
  public abstract getType(): CardProvider;
}

export abstract class CryptoLocator {
  /** @throws CryptoLocatorError */
  public abstract get(request: Request): CryptoService;
  public abstract has(request: Request): boolean;
}

export abstract class RequestMapper {
  public abstract map(request: Request, crypto: CryptoService): Promise<void> | void;
  public abstract getType(): CardProvider;
  public abstract getEncryptedKey(): string | symbol;
}

export abstract class RequestMapperLocator {
  /** @throws RequestMapperLocatorError */
  public abstract get(request: Request): RequestMapper;
  public abstract has(request: Request): boolean;
}
