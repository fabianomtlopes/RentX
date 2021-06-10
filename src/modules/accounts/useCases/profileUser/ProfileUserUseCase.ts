import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUserResponseDTO } from '@modules/accounts/repositories/IUserResponseDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
