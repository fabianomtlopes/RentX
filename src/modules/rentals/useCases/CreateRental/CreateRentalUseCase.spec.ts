import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { RentalRepositoryFake } from '@modules/rentals/repositories/fakes/RentalRepositoryFake';
import { CreateRentalUseCase } from '@modules/rentals/useCases/CreateRental/CreateRentalUseCase';
import { addDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { DateFnsProvider } from '@shared/container/provider/DateProvider/implementations/DateFnsProvider';
import { AppError } from '@shared/errors/AppError';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryFake: RentalRepositoryFake;
let dateFnsProvider: DateFnsProvider;
let carRepositoryFake: CarsRepositoryFake;

describe('Create Rental', () => {
  const dayAdd24Hours = addDays(zonedTimeToUtc(new Date(), 'America/Sao_Paulo'), 1);

  // console.log('AkIIIIIIII -----> ', dayAdd24Hours);
  beforeEach(() => {
    rentalsRepositoryFake = new RentalRepositoryFake();
    dateFnsProvider = new DateFnsProvider();
    carRepositoryFake = new CarsRepositoryFake();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryFake,
      dateFnsProvider,
      carRepositoryFake,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    // console.log(rental);

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time ', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expected_return_date: zonedTimeToUtc(new Date(), 'America/Sao_Paulo'), // dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
