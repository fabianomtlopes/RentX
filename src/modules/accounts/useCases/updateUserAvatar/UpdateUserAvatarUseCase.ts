// Adicionar coluna avatar na tabela de users
// Configuracao upload no multer
// Criar regra de negocio do upload
// criar o controler\
// refatorar usuario  com a coluna avatar

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '@utils/file';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.save(user);
  }
}
