import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { CardBlockedException, CardExpiredException, CardNotFoundException } from 'src/card-provider';
import { CryptoLocatorError, RequestMapperLocatorError } from 'src/crypto';
import { ErrorCode, ErrorCodeDescription, ErrorContract } from 'src/visa-mock/pan-lifecycle';
import { ErrorResponse } from 'src/visa-mock/visa-mock.interface';

export class VisaException extends RuntimeException {
  public readonly contract: ErrorContract;
  public readonly previous?: Error;
  private readonly propertyName?: string;

  constructor(
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    code: ErrorCode = ErrorCode.InternalError,
    description: ErrorCodeDescription = ErrorCodeDescription.InternalError,
    previous?: Error,
    propertyName?: string,
  ) {
    super(`Visa Exception: code "${code}" description "${description}" status "${status}"`);
    this.contract = { code, description, status };
    this.previous = previous;
    this.propertyName = propertyName;
  }

  static requiredDataMissing(previous?: Error, propertyName?: string): VisaException {
    return new VisaException(
      HttpStatus.BAD_REQUEST,
      ErrorCode.RequiredDataMissing,
      ErrorCodeDescription.RequiredDataMissing,
      previous,
      propertyName,
    );
  }

  static invalidData(previous?: Error, propertyName?: string): VisaException {
    return new VisaException(HttpStatus.BAD_REQUEST, ErrorCode.InvalidData, ErrorCodeDescription.InvalidData, previous, propertyName);
  }

  static invalidReplacementPan(previous?: Error): VisaException {
    return new VisaException(HttpStatus.BAD_REQUEST, ErrorCode.InvalidReplacementPan, ErrorCodeDescription.InvalidReplacementPan, previous);
  }

  static cryptographyError(previous?: Error): VisaException {
    return new VisaException(HttpStatus.BAD_REQUEST, ErrorCode.CryptographyError, ErrorCodeDescription.CryptographyError, previous);
  }

  static internalError(previous?: Error): VisaException {
    return new VisaException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.InternalError, ErrorCodeDescription.InternalError, previous);
  }

  static notFound(previous?: Error): VisaException {
    return new VisaException(HttpStatus.BAD_REQUEST, ErrorCode.NotFound, ErrorCodeDescription.NotFound, previous);
  }

  static stateExist(previous?: Error): VisaException {
    return new VisaException(HttpStatus.BAD_REQUEST, ErrorCode.StateExist, ErrorCodeDescription.StateExist, previous);
  }

  static fromError(previous: Error): VisaException {
    const mapping: Record<string, VisaException> = {
      ['JWEInvalid']: VisaException.cryptographyError(previous),
      ['JWEDecryptionFailed']: VisaException.cryptographyError(previous),
      [CryptoLocatorError.name]: VisaException.internalError(previous),
      [RequestMapperLocatorError.name]: VisaException.internalError(previous),
      [CardNotFoundException.name]: VisaException.invalidData(previous, 'primaryAccountNumber'),
      [CardExpiredException.name]: VisaException.invalidData(previous, 'primaryAccountNumber'),
      [CardBlockedException.name]: VisaException.invalidData(previous, 'primaryAccountNumber'),
      ['default']: VisaException.internalError(previous),
    };

    return mapping.hasOwnProperty(previous.name) ? mapping[previous.name] : mapping['default'];
  }

  getResponse(): ErrorResponse {
    const mapping: Record<string, ErrorResponse> = {
      [ErrorCode.CryptographyError]: {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input parameters validation failed.',
        reason: 'invalidParameter',
        details: [{ location: 'encryptedData', message: 'Unable to decrypt.' }],
      },
      [ErrorCode.InvalidReplacementPan]: {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input parameters validation failed.',
        reason: 'invalidParameter',
        details: [{ location: 'primaryAccountNumber', message: 'Not valid.' }],
      },
      [ErrorCode.RequiredDataMissing]: {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input parameters validation failed.',
        reason: 'invalidParameter',
        details: [{ location: this.propertyName, message: 'Data missing.' }],
      },
      [ErrorCode.StateExist]: {
        status: HttpStatus.BAD_REQUEST,
        message: 'Resource not found.',
        reason: 'Not Found',
        details: [],
      },
      [ErrorCode.InvalidData]: {
        status: HttpStatus.BAD_REQUEST,
        message: 'Input parameters validation failed.',
        reason: 'invalidParameter',
        details: [{ location: this.propertyName, message: 'Not Valid.' }],
      },
      [ErrorCode.InternalError]: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Caused by a server error. In case of this error, the client can retry the request again.',
        reason: 'serviceError',
        details: [],
      },
    };

    return mapping.hasOwnProperty(this.contract.code) ? mapping[this.contract.code] : mapping[ErrorCode.InternalError];
  }
}
