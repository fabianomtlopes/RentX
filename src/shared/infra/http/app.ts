import 'reflect-metadata';
import 'dotenv/config'; // to load file .env
import upload from '@config/upload';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';
import '@shared/infra/typeorm'; // para a conexao default do typeorm
import '@shared/container'; // tsrynge

import { AppError } from '@shared/errors/AppError';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: `Internal server error = ${err.message}` });
});

export { app };
