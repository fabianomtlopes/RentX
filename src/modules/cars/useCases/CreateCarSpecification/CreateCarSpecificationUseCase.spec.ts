import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { SpecificationRepositoryFake } from '@modules/cars/repositories/fakes/SpecificationsRepositoryFake';

import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryFake: CarsRepositoryFake;
let specificationFake: SpecificationRepositoryFake;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryFake = new CarsRepositoryFake();
    specificationFake = new SpecificationRepositoryFake();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryFake,
      specificationFake,
    );
  });

  it('should not be able to add a new specification a none existent car. ', async () => {
    const car_id = '123';
    const specifications_id = ['54321'];

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id }),
    ).rejects.toEqual(new AppError('Car does not exist.'));
  });

  it('should  be able to add a new specification for the car ', async () => {
    const car = await carsRepositoryFake.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'APYU9G333',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificationFake.create({
      description: 'test',
      name: 'test',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
