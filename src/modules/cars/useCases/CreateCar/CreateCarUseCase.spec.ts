import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryFake: CarsRepositoryFake;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryFake = new CarsRepositoryFake();
    createCarUseCase = new CreateCarUseCase(carsRepositoryFake);
  });

  it('Should be able to create a new car.', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'APYU9G333',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'PYU9G33',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'PYU9G33',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default.', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-9G33',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
    expect(car.available).toBe(true);
  });
});
