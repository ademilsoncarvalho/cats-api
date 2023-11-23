import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';
import { FindAllCatService } from 'src/application/services/findAll.cat.service';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UseCaseProxyModule } from 'src/infra/depences-proxy/usecase-proxy.module';
import { GlobalProvidersModule } from 'src/infra/depences/global.provider.module';

@Controller()
export class CatController {
  constructor(
    @Inject(UseCaseProxyModule.FIND_ALL_CAT_SERVICE)
    private readonly findAllCatProxyModule: FindAllCatService,
    @Inject(GlobalProvidersModule.LOGGER)
    private readonly logger: ILogger,
  ) {}

  @Get('/cats')
  async getAllCats(@Res() response) {
    try {
      response.json(await this.findAllCatProxyModule.execute());
    } catch (err) {
      this.logger.error(err.message, err.stack);
      response.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
    return response;
  }
}
