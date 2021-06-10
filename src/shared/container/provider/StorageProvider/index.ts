import { container } from 'tsyringe';

import { LocalStorageProvider } from '@shared/container/provider/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from '@shared/container/provider/StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from '@shared/container/provider/StorageProvider/IStorageProvider';

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK],
);
