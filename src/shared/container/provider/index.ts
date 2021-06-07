import { container } from 'tsyringe';

import { DateFnsProvider } from '@shared/container/provider/DateProvider/implementations/DateFnsProvider';

import { IDateProvider } from './DateProvider/IDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>('DateFnsProvider', DateFnsProvider);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);
