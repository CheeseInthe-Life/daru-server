export type ErrorCodeDescription = {
  name: string;
  message: string;
};

export class ErrorCode {
  public static COMMON_SYSTEM_ERROR: ErrorCodeDescription = {
    name: 'COMMON_SYSTEM_ERROR',
    message: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', //장애 상황
  };

  public static COMMON_INVALID_PARAMETER: ErrorCodeDescription = {
    name: 'COMMON_INVALID_PARAMETER',
    message: '요청한 값이 올바르지 않습니다.',
  };
  public static COMMON_ENTITY_NOT_FOUND: ErrorCodeDescription = {
    name: 'COMMON_ENTITY_NOT_FOUND',
    message: '존재하지 않는 엔티티입니다.',
  };
  public static COMMON_ENTITY_ALREADY_EXITS: ErrorCodeDescription = {
    name: 'COMMON_ENTITY_ALREADY_EXITS',
    message: '엔티티가 이미 존재합니다.',
  };
  public static COMMON_FILE_TRANSFER_ERROR: ErrorCodeDescription = {
    name: 'COMMON_FILE_TRANSFER_ERROR',
    message: '파일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
  };
  public static COMMON_ILLEGAL_STATUS: ErrorCodeDescription = {
    name: 'COMMON_ILLEGAL_STATUS',
    message: '잘못된 상태값입니다.',
  };
}
