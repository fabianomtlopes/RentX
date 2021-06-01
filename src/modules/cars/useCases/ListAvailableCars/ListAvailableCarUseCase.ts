import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRespository: ICarsRepository,
  ) {}

  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRespository.findAvailable(brand, name, category_id);
    return cars;
  }
}

export { ListAvailableCarUseCase };
