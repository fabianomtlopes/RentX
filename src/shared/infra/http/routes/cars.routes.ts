import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';

import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

carRoutes.get('/available', listAvailableCars.hash);

carRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carRoutes };
