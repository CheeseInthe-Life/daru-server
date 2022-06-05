import { LocalDate, LocalDateTime } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';
import { DateTimeUtil } from './date-time-util';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime | null): Date | null {
    if (entityValue === null) return null;
    return DateTimeUtil.toDate(entityValue);
  }
  from(databaseValue: Date | null): LocalDateTime | null {
    if (databaseValue === null) return null;
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}

export class LocalDateTransformer implements ValueTransformer {
  to(entityValue: LocalDate | null): Date | null {
    if (entityValue === null) return null;
    return DateTimeUtil.toDate(entityValue);
  }
  from(databaseValue: Date | null): LocalDate | null {
    if (databaseValue === null) return null;
    return DateTimeUtil.toLocalDate(databaseValue);
  }
}
