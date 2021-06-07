import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rentals } from '@modules/rentals/infra/typeorm/entities/Rentals';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rentals>;

  constructor() {
    this.repository = getRepository(Rentals);
  }

  async findById(id: string): Promise<Rentals> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rentals> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rentals[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentals;
  }
}

export { RentalsRepository };
