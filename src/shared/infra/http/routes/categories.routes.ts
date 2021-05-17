import { CreateCategoryController } from '@modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/ListCategories/ListCategoriesController';
import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', ensureAuthenticated, createCategoryController.handle);

categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
