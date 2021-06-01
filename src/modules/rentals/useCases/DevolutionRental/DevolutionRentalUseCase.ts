import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rentals } from '@modules/rentals/infra/typeorm/entities/Rentals';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { injectable, inject } from 'tsyringe';

import { IDateProvider } from '@shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateFnsProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rentals> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carRepository.findById(rental.car_id);

    const minimun_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exists.');
    }

    // Verificar o tempo de aluguel

    const dateNow = new Date();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimun_daily;
    }

    let total = 0;

    const delay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);
    console.log('Aki ******** => ', delay);
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.updated_at = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carRepository.save(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
