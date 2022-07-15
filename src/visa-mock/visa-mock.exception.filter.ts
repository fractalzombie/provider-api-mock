import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { VisaException } from 'src/visa-mock/visa-mock.exception';

@Catch(VisaException)
export class VisaMockExceptionFilter implements ExceptionFilter<VisaException> {
  catch(exception: VisaException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(exception.contract.status).json({ errorResponse: exception.getResponse() });
  }
}
