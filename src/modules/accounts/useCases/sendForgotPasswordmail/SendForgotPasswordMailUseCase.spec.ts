import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UserRepositoryFake';
import { UsersTokensRepositoryFake } from '@modules/accounts/repositories/fakes/UsersTokensRepositoryFake';

import { DateFnsProvider } from '@shared/container/provider/DateProvider/implementations/DateFnsProvider';
import { MailProviderFake } from '@shared/container/provider/MailProvider/fakes/MailProviderFake';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryFake: UsersRepositoryFake;
let usersTokensRepositoryFake: UsersTokensRepositoryFake;
let dateProvider: DateFnsProvider;
let mailProviderFake: MailProviderFake;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersTokensRepositoryFake = new UsersTokensRepositoryFake();
    dateProvider = new DateFnsProvider();
    mailProviderFake = new MailProviderFake();
    usersRepositoryFake = new UsersRepositoryFake();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryFake,
      usersTokensRepositoryFake,
      dateProvider,
      mailProviderFake,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderFake, 'sendMail');

    await usersRepositoryFake.create({
      driver_license: 'teste ABC234',
      email: 'test@test.com',
      name: 'Test',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('test@test.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if does not user exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('fakeMail@fake.com'),
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('should be able to create an user token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryFake, 'create');

    await usersRepositoryFake.create({
      driver_license: 'teste ABC234',
      email: 'test@test.com',
      name: 'Test',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('test@test.com');

    expect(generateTokenMail).toBeCalled();
  });
});
