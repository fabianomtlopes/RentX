import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rentals } from '@modules/rentals/infra/typeorm/entities/Rentals';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rentals>;
  findOpenRentalByCar(car_id: string): Promise<Rentals>;
  findOpenRentalByUser(user_id: string): Promise<Rentals>;
  findById(id: string): Promise<Rentals>;
}

export { IRentalsRepository };
