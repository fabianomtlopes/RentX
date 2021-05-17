import { CreateSpecificationController } from '@modules/cars/useCases/CreateSpecification/CreateSpecificationController';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', ensureAuthenticated, createSpecificationController.handle);

export { specificationsRoutes };
