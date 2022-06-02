import { NotNull, Nullable, Optional } from '../common-type';
import { ErrorCode, ErrorCodeDescription } from './error-code';

export enum Result {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export class CommonResponse<T> {
  result: Result;
  data: Nullable<T>;
  message: Optional<string>;
  errorCode: Optional<string>;

  private constructor({
    data,
    errorCode,
    message,
    result,
  }: {
    result: Result;
    data: Nullable<T>;
    message: Nullable<string>;
    errorCode: Nullable<string>;
  }) {
    this.result = result;
    this.data = data;
    this.errorCode = errorCode;
    this.message = message;
  }

  static fail(errorCode: ErrorCodeDescription): CommonResponse<any> {
    return new CommonResponse<any>({
      result: Result.FAIL,
      message: errorCode.message,
      data: null,
      errorCode: errorCode.name,
    });
  }

  static success<T>(data: T): CommonResponse<T> {
    return new CommonResponse({
      data,
      result: Result.SUCCESS,
      errorCode: null,
      message: null,
    });
  }
}
