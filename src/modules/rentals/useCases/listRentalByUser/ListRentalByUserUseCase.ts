import { Rentals } from '@modules/rentals/infra/typeorm/entities/Rentals';
import { injectable, inject } from 'tsyringe';

import { IRentalsRepository } from '../../repositories/IRentalsRepository';

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute(user_id: string): Promise<Rentals[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalByUserUseCase };
