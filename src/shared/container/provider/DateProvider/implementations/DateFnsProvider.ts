import {
  formatDistanceStrict,
  differenceInDays,
  addDays,
  addHours,
  isBefore,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { IDateProvider } from '../IDateProvider';

class DateFnsProvider implements IDateProvider {
  compareInDays(start_date: Date, end_date: Date): number {
    const startDate = zonedTimeToUtc(start_date, 'America/Sao_Paulo');
    const endDate = zonedTimeToUtc(end_date, 'America/Sao_Paulo');

    const diferenceDays = differenceInDays(endDate, startDate);
    return diferenceDays;
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const startDate = zonedTimeToUtc(start_date, 'America/Sao_Paulo');
    const endDate = zonedTimeToUtc(end_date, 'America/Sao_Paulo');

    // eslint-disable-next-line radix
    return parseInt(formatDistanceStrict(startDate, endDate, { unit: 'hour' }));
  }

  addDays(days: number): Date {
    return addDays(new Date(), days);
  }

  addHour(hours: number): Date {
    return addHours(new Date(), hours);
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return isBefore(start_date, end_date);
  }
}

export { DateFnsProvider };
