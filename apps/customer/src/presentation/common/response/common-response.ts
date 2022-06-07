import { LocalDateTime } from '@js-joda/core';
import { HttpStatus } from '@nestjs/common';
import { Nullable, Optional } from '../common-type';

export enum Result {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export class CommonResponse<T> {
  result: Result;
  data: Nullable<T>;
  message: Optional<string>;
  statusCode: Optional<HttpStatus>;
  timestamp: string;
  name: Optional<string>;

  private constructor({
    data,
    statusCode,
    message,
    result,
  }: {
    result: Result;
    data: Nullable<T>;
    message: Nullable<string>;
    statusCode: Nullable<HttpStatus>;
  }) {
    this.result = result;
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = LocalDateTime.now().toString();
  }

  static fail({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: HttpStatus;
  }): CommonResponse<any> {
    return new CommonResponse<any>({
      result: Result.FAIL,
      message: message,
      statusCode: statusCode,
      data: null,
    });
  }

  static success<T>(data: T): CommonResponse<T> {
    return new CommonResponse({
      data,
      result: Result.SUCCESS,
      statusCode: null,
      message: null,
    });
  }
}
