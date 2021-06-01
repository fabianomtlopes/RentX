import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';

import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

let listAvailableCarUseCase: ListAvailableCarUseCase;
let carsRespository: CarsRepositoryFake;

describe('List Car', () => {
  beforeEach(() => {
    carsRespository = new CarsRepositoryFake();
    listAvailableCarUseCase = new ListAvailableCarUseCase(carsRespository);
  });

  it('should be to list all available cars.', async () => {
    const car = await carsRespository.create({
      brand: 'Test Car',
      category_id: '1212',
      daily_rate: 100,
      description: 'Carro Test SUB',
      fine_amount: 20,
      license_plate: 'TESTE-PLATE',
      name: 'TEST',
    });
    const cars = await listAvailableCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be to list all available cars by brand.', async () => {
    const car = await carsRespository.create({
      brand: 'Test Car2',
      category_id: '1212',
      daily_rate: 100,
      description: 'Carro Test SUB',
      fine_amount: 20,
      license_plate: 'TESTE-PLATE',
      name: 'TEST',
    });
    const cars = await listAvailableCarUseCase.execute({
      brand: 'Test Car2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be to list all available cars by name.', async () => {
    const car = await carsRespository.create({
      brand: 'Test Car3',
      category_id: '1212',
      daily_rate: 100,
      description: 'Carro Test SUB',
      fine_amount: 20,
      license_plate: 'TESTE-PLATE',
      name: 'TEST',
    });
    const cars = await listAvailableCarUseCase.execute({
      name: 'TEST',
    });

    expect(cars).toEqual([car]);
  });

  it('should be to list all available cars by categories.', async () => {
    const car = await carsRespository.create({
      brand: 'Test Car4',
      category_id: '12123',
      daily_rate: 100,
      description: 'Carro Test SUB',
      fine_amount: 20,
      license_plate: 'TESTE-PLATE',
      name: 'TEST',
    });
    const cars = await listAvailableCarUseCase.execute({
      category_id: '12123',
    });

    expect(cars).toEqual([car]);
  });
});
