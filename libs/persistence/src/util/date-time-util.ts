import { LocalDate, LocalDateTime, nativeJs } from '@js-joda/core';

export class DateTimeUtil {
  static toLocalDateTime(date: Date | string | null): LocalDateTime | null {
    if (date === null) return null;
    return LocalDateTime.from(
      typeof date === 'object'
        ? nativeJs(date)
        : nativeJs(new Date(date as string) as Date),
    );
  }

  static toLocalDate(date: Date | string | null): LocalDate | null {
    if (date === null) return null;
    return LocalDate.from(
      typeof date === 'object'
        ? nativeJs(date)
        : nativeJs(new Date(date as string) as Date),
    );
  }

  static toDate(date: LocalDateTime | LocalDate | null): Date | null {
    if (date === null) return null;
    return new Date(date.toString());
  }
}
