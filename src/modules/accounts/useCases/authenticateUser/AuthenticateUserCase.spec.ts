import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UserRepositoryFake';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryFake: UsersRepositoryFake;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryFake = new UsersRepositoryFake();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryFake);
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
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an incorrect password.', async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Fabiano Lopes',
        email: 'fabiano@gmail.com',
        password: '1234',
        driver_license: '1234cnh',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
