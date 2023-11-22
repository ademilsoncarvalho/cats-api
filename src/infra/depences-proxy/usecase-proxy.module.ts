import { CatRepository } from 'src/domain/repositories/cat.repository';
import { FindAllCatService } from '../../application/services/findAll.cat.service';
import { RepositoriesModule } from '../repository/repositories.module';
import { Module } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { LoggerModule } from '../logger/logger';
import { GlobalProvidersModule } from '../depences/global.provider.module';

@Module({
  imports: [RepositoriesModule, LoggerModule],
})
export class UseCaseProxyModule {
  static FIND_ALL_CAT_SERVICE = 'FindAllCatService';
  static register() {
    return {
      module: UseCaseProxyModule,
      providers: [
        {
          provide: UseCaseProxyModule.FIND_ALL_CAT_SERVICE,
          useFactory: (logger: ILogger, catRepository: CatRepository) => {
            return new FindAllCatService(logger, catRepository);
          },
          inject: [
            GlobalProvidersModule.LOGGER,
            GlobalProvidersModule.CAT_REPO,
          ],
        },
      ],
      exports: [UseCaseProxyModule.FIND_ALL_CAT_SERVICE],
    };
  }
}
