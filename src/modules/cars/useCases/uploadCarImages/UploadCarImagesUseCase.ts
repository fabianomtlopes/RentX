// import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async image => {
      await this.carImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
