import { LocalDateTime } from '@js-joda/core';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Nullable } from 'apps/common-type';

export enum Result {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export class CommonResponse<T> {
  @ApiProperty()
  result: Result;
  @ApiProperty()
  data: Nullable<T>;
  @ApiPropertyOptional({ type: String })
  message: Nullable<string>;
  @ApiProperty({ type: Number, example: 200 })
  statusCode: HttpStatus;
  @ApiPropertyOptional({ type: String })
  name: Nullable<string>;
  @ApiProperty()
  timestamp: string;

  private constructor({
    data,
    statusCode,
    message = null,
    result,
  }: {
    result: Result;
    data: Nullable<T>;
    message: Nullable<string>;
    statusCode: HttpStatus;
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
      statusCode: HttpStatus.OK,
      message: null,
    });
  }
}
