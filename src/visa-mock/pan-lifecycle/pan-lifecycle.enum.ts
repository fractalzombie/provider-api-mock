import { HttpStatus } from '@nestjs/common';

export enum OperationType {
  Update = 'Update',
  Delete = 'Delete',
}

export enum OperationReasonCode {
  AccountUpdate = 'ACCOUNT_UPDATE',
  AccountClosed = 'ACCOUNT_CLOSED',
  ExpirationDateUpdate = 'EXP_DATE_UPDATE',
  ContractCardholder = 'CONTACT_CARDHOLDER',
  PortfolioConversion = 'PORTFOLIO_CONVERSION',
  UpdateAccountLevelRecord = 'UPDATE_ACCOUNT_LEVEL_RECORD',
}

export enum MethodOfContact {
  PhysicalMail = 'M',
  Email = 'E',
  Mobile = 'C',
}

export enum LinkReasonCode {
  Lost = 'L',
  Stolen = 'S',
  UpgradeOrDowngrade = 'U',
  Other = 'O',
  Reissued = 'R',
  NotKnown = 'N',
}

export enum UnlinkIndicator {
  UserTryingUnlinkAccountNumber = 'Y',
}

export enum RecordAction {
  Add = 'Add',
  Change = 'Change',
  Delete = 'Delete',
}

export enum ContactAction {
  Add = 'Add',
}

export enum PrimaryAccount {
  Yes = 'Y',
  No = 'N',
}

export enum GroupType {
  AuthorizedCardAccount = 'LOC',
  SameCardholder = 'CUSTOMER',
  AppliedToGivenPrimaryAccountNumber = 'VIP1',
  PrimaryAccountIsVirtualCard = 'VIRTUAL',
  SegmentAppliedToPrimaryAccountNumber = 'ISEGMENT',
  Unknown = 'USHNW',
}

export enum ErrorCode {
  RequiredDataMissing = 'VSE40001',
  InvalidData = 'VSE40000',
  StateExist = 'VSE40002',
  NotFound = 'VSE40003',
  InvalidReplacementPan = 'VSE40006',
  CryptographyError = 'VSE40010',
  InternalError = 'VSE40009',
}

export enum ErrorCodeDescription {
  RequiredDataMissing = 'VSE_ERROR_REQUIRED_DATA_MISSING',
  InvalidData = 'VSE_ERROR_INVALID_DATA',
  InvalidReplacementPan = 'VSE_ERROR_INVALID_REPLACEMENT_PAN',
  StateExist = 'VSE_ERROR_TOKEN_STATE_EXIST',
  NotFound = 'VSE_ERROR_TOKEN_NOT_FOUND',
  CryptographyError = 'VSE_ERROR_CRYPTOGRAPHY_ERROR',
  InternalError = 'VSE_INTERNAL_SYSTEM_ERROR',
}

export enum ActionCode {
  UnconditionalApproval = '00',
  ConditionalApproval = '85',
  GenericDecline = '05',
  GenericError = '06',
  Cvv2Failed = 'N7',
  InvalidExpirationDate = '54',
  InvalidPan = '14',
  InternalSystemError = '96',
}

export interface ErrorContract {
  status: HttpStatus;
  code: ErrorCode;
  description: ErrorCodeDescription;
}
