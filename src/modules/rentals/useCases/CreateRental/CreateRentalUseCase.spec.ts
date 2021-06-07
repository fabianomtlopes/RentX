import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { RentalRepositoryFake } from '@modules/rentals/repositories/fakes/RentalRepositoryFake';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
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
    const car = await carRepositoryFake.create({
      name: 'Test',
      brand: 'Toytest',
      description: 'Fire test',
      daily_rate: 100,
      license_plate: 'test_AABB',
      fine_amount: 50,
      category_id: '1234',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    // console.log(rental);

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryFake.create({
      car_id: '1111',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('There`s a rental in progress for user.'));
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryFake.create({
      car_id: 'test',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '321',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable.'));
  });

  it('should not be able to create a new rental with invalid return time ', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expected_return_date: zonedTimeToUtc(new Date(), 'America/Sao_Paulo'), // dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Invalid return time.'));
  });
});
