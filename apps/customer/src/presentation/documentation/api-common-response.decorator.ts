import {
  applyDecorators,
  InternalServerErrorException,
  Type,
} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponse } from '../common/response/common-response';

type PrimitiveType = 'number' | 'boolean' | 'string';

export const ApiCommonResponse = (
  dto: Type<unknown> | PrimitiveType,
  failResponseList?: Type<unknown>[],
) => {
  if (
    typeof dto === 'string' ||
    typeof dto === 'number' ||
    typeof dto === 'bigint' ||
    typeof dto === 'boolean'
  ) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(CommonResponse) },
            {
              properties: {
                data: {
                  type: typeof dto,
                },
              },
            },
          ],
        },
      }),
    );
  } else if (typeof dto === 'object') {
    return applyDecorators(
      ApiExtraModels(dto),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(CommonResponse) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(dto),
                },
              },
            },
          ],
        },
      }),
    );
  } else {
    return applyDecorators(
      ApiExtraModels(dto),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(CommonResponse) },
            {
              properties: {
                data: {
                  type: 'unknown',
                },
              },
            },
          ],
        },
      }),
    );
  }
};
