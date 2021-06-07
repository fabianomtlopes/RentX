import auth from '@config/auth';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { verify, sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import { IDateProvider } from '@shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateFnsProvider')
    private dateFnsProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const {
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefeshTokenDays,
    } = auth.jwt;
    const { email, sub } = verify(token, secretRefreshToken) as IPayload;

    const user_id = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secretRefreshToken, {
      subject: sub,
      expiresIn: expiresInRefreshToken,
    });

    const expires_date = this.dateFnsProvider.addDays(expiresRefeshTokenDays);

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const { secret, expiresIn } = auth.jwt;

    const newToken = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    return { refresh_token, token: newToken };
  }
}

export { RefreshTokenUseCase };
