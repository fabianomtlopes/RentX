import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { IDateProvider } from '@shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('DateFnsProvider')
    private dateFnsProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Token invalid!');
    }

    const compareDateToken = this.dateFnsProvider.compareIfBefore(
      userToken.expires_date,
      new Date(),
    );

    if (compareDateToken) {
      throw new AppError('Token expired!');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    const hashPassword = await hash(password, 8);

    user.password = hashPassword;
    user.updated_at = new Date();

    await this.userRepository.save(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
