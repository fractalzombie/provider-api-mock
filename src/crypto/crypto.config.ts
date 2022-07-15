import { registerAs } from '@nestjs/config';
import { KeyFormat } from 'crypto';

export interface CryptoConfiguration {
  key: string;
  passphrase: string;
  format: KeyFormat;
  algorithm: string;
  encryption: string;
  compression: string;
}

const factory = (): CryptoConfiguration => ({
  key: process.env.VISA_JWT_KEY_VALUE,
  passphrase: process.env.VISA_JWT_KEY_PASSPHRASE,
  format: <KeyFormat>process.env.VISA_JWT_KEY_FORMAT,
  algorithm: process.env.VISA_JWT_ALGORITHM,
  encryption: process.env.VISA_JWT_ENCRYPTION,
  compression: process.env.VISA_JWT_COMPRESSION,
});

export default registerAs('crypto', factory);
