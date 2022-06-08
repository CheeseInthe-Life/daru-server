import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponse } from '../common/response/common-response';

type PrimitiveType = 'number' | 'boolean' | 'string';

export const ApiCommonResponse = (dto: Type<unknown> | PrimitiveType) => {
  if (typeof dto !== 'object' || typeof dto !== 'function') {
    return applyDecorators(
      ApiResponse({
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
  } else {
    return applyDecorators(
      ApiExtraModels(dto),
      ApiResponse({
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
  }
};
