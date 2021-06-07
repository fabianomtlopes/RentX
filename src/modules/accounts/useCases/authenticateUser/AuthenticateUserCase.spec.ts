import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UserRepositoryFake';
import { UsersTokensRepositoryFake } from '@modules/accounts/repositories/fakes/UsersTokensRepositoryFake';

import { DateFnsProvider } from '@shared/container/provider/DateProvider/implementations/DateFnsProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryFake: UsersRepositoryFake;
let userTokenRepositoryFake: UsersTokensRepositoryFake;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DateFnsProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryFake = new UsersRepositoryFake();
    userTokenRepositoryFake = new UsersTokensRepositoryFake();
    dateProvider = new DateFnsProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryFake,
      userTokenRepositoryFake,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryFake);
  });

  it('should be able to authenticate an user.', async () => {
    const user: ICreateUserDTO = {
      name: 'Fabiano Lopes',
      email: 'fabiano@gmail.com',
      password: '1234',
      driver_license: '1234cnh',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a none existent user.', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('E-mail or password incorrect!'));
  });

  it('should not be able to authenticate with an incorrect password.', async () => {
    const user: ICreateUserDTO = {
      name: 'Fabiano Lopes',
      email: 'fabiano@gmail.com',
      password: '1234',
      driver_license: '1234cnh',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      }),
    ).rejects.toEqual(new AppError('E-mail or password incorrect!'));
  });
});
