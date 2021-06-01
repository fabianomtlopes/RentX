import { formatDistanceStrict, differenceInDays } from 'date-fns';
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
}

export { DateFnsProvider };
