import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryFake implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);
  }

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}

export { UsersRepositoryFake };
