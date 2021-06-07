import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalByUserUseCase } from './ListRentalByUserUseCase';

class ListRentalByUserController {
  async hash(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);

    const rentalsByUser = await listRentalByUserUseCase.execute(id);

    return response.status(201).json(rentalsByUser);
  }
}

export { ListRentalByUserController };
