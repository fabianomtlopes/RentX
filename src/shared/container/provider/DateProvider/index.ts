import { container } from 'tsyringe';

import { DateFnsProvider } from '@shared/container/provider/DateProvider/implementations/DateFnsProvider';

import { IDateProvider } from './IDateProvider';

container.registerSingleton<IDateProvider>('DateFnsProvider', DateFnsProvider);
