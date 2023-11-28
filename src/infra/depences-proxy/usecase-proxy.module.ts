import { CatRepository } from 'src/domain/repositories/cat.repository';
import { FindAllCatService } from '../../application/services/findAll.cat.service';
import { RepositoriesModule } from '../repository/repositories.module';
import { Module } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { LoggerModule } from '../logger/logger';
import { GlobalProvidersModule } from '../depences/global.provider.module';
import { CreateCatService } from 'src/application/services/create.cat.service';
import { UpdateCatService } from 'src/application/services/update.cat.service';
import { DeleteCatService } from 'src/application/services/delete.cat.service';
import { FindByIdCatService } from 'src/application/services/findById.cat.service';

@Module({
  imports: [RepositoriesModule, LoggerModule],
})
export class UseCaseProxyModule {
  static FIND_ALL_CAT_SERVICE = 'FindAllCatService';
  static CREATE_CAT_SERVICE = 'CreateCatService';
  static UPDATE_CAT_SERVICE = 'UpdateCatService';
  static DELETE_CAT_SERVICE = 'DeleteCatService';
  static FIND_BY_ID_CAT_SERVICE = 'FindByIdCatService';

  static createProvider(serviceName: string, serviceClass: any) {
    return {
      provide: serviceName,
      useFactory: (logger: ILogger, catRepository: CatRepository) => {
        return new serviceClass(logger, catRepository);
      },
      inject: [GlobalProvidersModule.LOGGER, GlobalProvidersModule.CAT_REPO],
    };
  }

  static register() {
    return {
      module: UseCaseProxyModule,
      providers: [
        UseCaseProxyModule.createProvider(
          UseCaseProxyModule.FIND_ALL_CAT_SERVICE,
          FindAllCatService,
        ),
        UseCaseProxyModule.createProvider(
          UseCaseProxyModule.CREATE_CAT_SERVICE,
          CreateCatService,
        ),
        UseCaseProxyModule.createProvider(
          UseCaseProxyModule.UPDATE_CAT_SERVICE,
          UpdateCatService,
        ),
        UseCaseProxyModule.createProvider(
          UseCaseProxyModule.DELETE_CAT_SERVICE,
          DeleteCatService,
        ),
        UseCaseProxyModule.createProvider(
          UseCaseProxyModule.FIND_BY_ID_CAT_SERVICE,
          FindByIdCatService,
        ),
      ],
      exports: [
        UseCaseProxyModule.FIND_ALL_CAT_SERVICE,
        UseCaseProxyModule.CREATE_CAT_SERVICE,
        UseCaseProxyModule.UPDATE_CAT_SERVICE,
        UseCaseProxyModule.DELETE_CAT_SERVICE,
        UseCaseProxyModule.FIND_BY_ID_CAT_SERVICE,
      ],
    };
  }
}
