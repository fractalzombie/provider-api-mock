import { ApiProperty } from '@nestjs/swagger';
import {
  ContactAction,
  GroupType,
  LinkReasonCode,
  MethodOfContact,
  OperationReasonCode,
  OperationType,
  PrimaryAccount,
  RecordAction,
  UnlinkIndicator,
} from 'src/visa-mock/pan-lifecycle/pan-lifecycle.enum';

export class LinkGroup implements Readonly<LinkGroup> {
  @ApiProperty({ required: true, enum: RecordAction })
  action: RecordAction;

  @ApiProperty({ required: true, enum: GroupType })
  groupType: GroupType;

  @ApiProperty({ required: true })
  groupID: string;

  @ApiProperty({ required: false, enum: PrimaryAccount })
  isPrimaryAccount: PrimaryAccount;
}

export class RPINEnrollmentInfo implements Readonly<RPINEnrollmentInfo> {
  @ApiProperty({ required: true, enum: RecordAction })
  action: RecordAction;

  @ApiProperty({ required: true })
  accountOpenDate: Date;

  @ApiProperty({ required: true })
  rpin: string;

  @ApiProperty({ required: false })
  rpinEffectiveDate?: Date;
}

export class ReplaceEnrollmentInfo implements Readonly<ReplaceEnrollmentInfo> {
  @ApiProperty({ required: true })
  oldAccountNumber: string;

  @ApiProperty({ required: false, enum: LinkReasonCode })
  linkReasonCode?: LinkReasonCode;

  @ApiProperty({ required: false, enum: UnlinkIndicator })
  unlinkIndicator?: UnlinkIndicator;
}

export class LinkEnrollmentInfo implements Readonly<LinkEnrollmentInfo> {
  @ApiProperty({ required: true, type: [LinkGroup] })
  group: LinkGroup[];
}

export class AddressInfo implements Readonly<AddressInfo> {
  @ApiProperty({ required: true })
  line1: string;

  @ApiProperty({ required: false })
  line2?: string;

  @ApiProperty({ required: false })
  companyName?: string;

  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: false })
  state?: string;

  @ApiProperty({ required: false })
  zip?: string;
}

export class ContactInfo implements Readonly<ContactInfo> {
  @ApiProperty({ required: true, enum: ContactAction })
  action: ContactAction;

  @ApiProperty({ required: false })
  address?: AddressInfo;

  @ApiProperty({ required: false })
  namePrefix?: string;

  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: false })
  middleInitial?: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: false })
  nameSuffix?: string;

  @ApiProperty({ required: false, enum: MethodOfContact })
  prefMethodOfContact?: MethodOfContact;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  mobileNumber?: string;
}

export class AccountLevelInfo implements Readonly<AccountLevelInfo> {
  @ApiProperty()
  productID: string;

  @ApiProperty()
  rpinEnrollment: RPINEnrollmentInfo;

  @ApiProperty()
  customerContactInfo: ContactInfo;

  @ApiProperty()
  replaceEnrollment: ReplaceEnrollmentInfo;

  @ApiProperty()
  linkEnrollment: LinkEnrollmentInfo;
}

export class ExpirationDate implements Readonly<ExpirationDate> {
  @ApiProperty({ required: true })
  month: string;

  @ApiProperty({ required: true })
  year: string;
}

export class CardholderInfo implements Readonly<CardholderInfo> {
  @ApiProperty({ required: true })
  primaryAccountNumber: string;

  @ApiProperty({ required: true })
  expirationDate: ExpirationDate;
}

export class EncryptedData implements Readonly<EncryptedData> {
  @ApiProperty({ required: true })
  cardholderInfo: CardholderInfo;

  @ApiProperty({ required: false })
  replaceCardholderInfo: CardholderInfo;

  @ApiProperty({ required: false })
  accountLevelInfo?: AccountLevelInfo;
}

export abstract class EncryptedRequest<T> implements Readonly<EncryptedRequest<T>> {
  @ApiProperty({ required: true })
  encryptedData: T;
}

export class PanLifecycleRequest implements EncryptedRequest<EncryptedData>, Readonly<PanLifecycleRequest> {
  @ApiProperty({ required: false })
  operatorID?: string;

  @ApiProperty({ required: true, enum: OperationType })
  operationType: OperationType;

  @ApiProperty({ required: true })
  operationReason: string;

  @ApiProperty({ required: true, enum: OperationReasonCode })
  operationReasonCode: OperationReasonCode;

  @ApiProperty({ required: false })
  updateReferenceID?: string;

  @ApiProperty({ required: true })
  encryptedData: EncryptedData;
}

export class PanLifecycleQueryRequest implements Readonly<PanLifecycleQueryRequest> {
  @ApiProperty({ required: true })
  apiKey: string;
}
