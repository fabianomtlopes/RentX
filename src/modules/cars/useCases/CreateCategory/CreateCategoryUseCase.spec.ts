import { AppError } from '@shared/errors/AppError';

import { CategoriesRepositoryFake } from '../../repositories/fakes/CategoriesRepositoryFake';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryFake: CategoriesRepositoryFake;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryFake = new CategoriesRepositoryFake();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryFake);
  });

  it('should be able to create a new category.', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Text',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryFake.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists.', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Text',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      }),
    ).rejects.toEqual(new AppError('Category already exists'));
  });
});
