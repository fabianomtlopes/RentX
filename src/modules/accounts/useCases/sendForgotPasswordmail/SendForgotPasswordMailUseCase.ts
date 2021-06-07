import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { resolve } from 'path';
import { injectable, inject } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IDateProvider } from '@shared/container/provider/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/provider/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository,
    @inject('DateFnsProvider')
    private dateFnsProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = uuidV4();

    const expires_date = this.dateFnsProvider.addHour(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      expires_date,
      user_id: user.id,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
