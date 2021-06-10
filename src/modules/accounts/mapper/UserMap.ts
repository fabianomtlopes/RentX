import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUserResponseDTO } from '@modules/accounts/repositories/IUserResponseDTO';
import { classToClass } from 'class-transformer';

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
