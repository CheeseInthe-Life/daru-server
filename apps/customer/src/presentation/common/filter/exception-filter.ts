import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonResponse } from '../response/common-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const name = exception.name;
    const stack = exception.stack;

    Logger.error(`
        name: ${name},
        message: ${message},
        status: ${status},
    `);
    console.error(stack);

    response.status(status).json(
      CommonResponse.fail({
        message: message,
        statusCode: status,
      }),
    );
  }
}
