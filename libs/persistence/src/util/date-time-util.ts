import { LocalDate, LocalDateTime, nativeJs } from '@js-joda/core';
import { Logger } from '@nestjs/common';

export class DateTimeUtil {
  static toLocalDateTime(date: Date | string): LocalDateTime {
    return LocalDateTime.from(
      typeof date === 'object'
        ? nativeJs(date)
        : nativeJs(new Date(date as string) as Date),
    );
  }

  static toLocalDate(date: Date | string): LocalDate {
    return LocalDate.from(
      typeof date === 'object'
        ? nativeJs(date)
        : nativeJs(new Date(date as string) as Date),
    );
  }

  static toDate(date: LocalDateTime | LocalDate): Date | null {
    if (date) return new Date(date.toString());
    else return null;
  }
}
