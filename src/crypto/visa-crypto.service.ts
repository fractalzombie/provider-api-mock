import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createPrivateKey, KeyObject } from 'crypto';
import { EncryptJWT, jwtDecrypt, JWTPayload } from 'jose';
import { CardProvider } from 'src/card-provider';
import cryptoConfig from 'src/crypto/crypto.config';
import { CryptoService } from 'src/crypto/crypto.interface';

@Injectable()
export class VisaCryptoService implements CryptoService {
  private readonly headers: { alg: string; enc: string; zip: string };
  private readonly key: KeyObject;

  constructor(@Inject(cryptoConfig.KEY) readonly config: ConfigType<typeof cryptoConfig>) {
    this.headers = { alg: this.config.algorithm, enc: this.config.encryption, zip: this.config.compression };
    this.key = createPrivateKey(this.config);
  }

  public async decrypt(payload: string): Promise<object> {
    const decrypted = await jwtDecrypt(payload, this.key);

    return decrypted.payload;
  }

  async encrypt(payload: object): Promise<string> {
    return await new EncryptJWT(<JWTPayload>payload).setProtectedHeader(this.headers).encrypt(this.key);
  }

  getType(): CardProvider {
    return CardProvider.Visa;
  }
}
