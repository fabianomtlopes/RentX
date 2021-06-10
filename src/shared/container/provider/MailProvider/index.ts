import { container } from 'tsyringe';

import { IMailProvider } from '@shared/container/provider/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/container/provider/MailProvider/implementations/EtherealMailProvider';
import { SESMailProvider } from '@shared/container/provider/MailProvider/implementations/SESMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
