import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError('Just admin has permission.', 400);
  }

  next();
}
