import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rentals } from '@modules/rentals/infra/typeorm/entities/Rentals';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { injectable, inject } from 'tsyringe';

import { IDateProvider } from '@shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateFnsProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rentals> {
    const minimunHours = 24;

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable.');
    }
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('There`s a rental in progress for user.');
    }

    // O aluguel deve ter duracao mínima 24hs
    const dateNow = new Date();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimunHours) {
      throw new AppError('Invalid return time.');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carRepository.save(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
