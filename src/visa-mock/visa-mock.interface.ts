import { HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  status: HttpStatus;
  message: string;
  reason: string;
  details: { location: string; message: string }[];
}
