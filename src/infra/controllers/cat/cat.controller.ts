import {
  Logger,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Res,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FindAllCatService } from 'src/application/services/findAll.cat.service';
import { UpdateCatService } from 'src/application/services/update.cat.service';
import { DeleteCatService } from 'src/application/services/delete.cat.service';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UseCaseProxyModule } from 'src/infra/depences-proxy/usecase-proxy.module';
import { GlobalProvidersModule } from 'src/infra/depences/global.provider.module';
import { FindByIdCatService } from 'src/application/services/findById.cat.service';
import { CreateCatService } from 'src/application/services/create.cat.service';

@Controller('cats')
export class CatController {
  constructor(
    @Inject(UseCaseProxyModule.FIND_ALL_CAT_SERVICE)
    private readonly findAllCatProxyModule: FindAllCatService,
    @Inject(UseCaseProxyModule.CREATE_CAT_SERVICE)
    private readonly createCatProxyModule: CreateCatService,
    @Inject(UseCaseProxyModule.UPDATE_CAT_SERVICE)
    private readonly updateCatProxyModule: UpdateCatService,
    @Inject(UseCaseProxyModule.DELETE_CAT_SERVICE)
    private readonly deleteCatProxyModule: DeleteCatService,
    @Inject(UseCaseProxyModule.FIND_BY_ID_CAT_SERVICE)
    private readonly findByIdCatProxyModule: FindByIdCatService,
    @Inject(GlobalProvidersModule.LOGGER)
    private readonly logger: ILogger,
  ) {}

  @Get()
  async getAllCats(@Res() response) {
    try {
      response.json(await this.findAllCatProxyModule.execute());
    } catch (err) {
      this.logger.error(err.message, err.stack);
      response.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
    return response;
  }

  @Get(':id')
  async getCat(@Res() response, @Param('id') id) {
    try {
      const cat = await this.findByIdCatProxyModule.execute(id);
      if (!cat) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Cat not found teste' });
      }
      response.json(cat);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      response.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
    return response;
  }

  @Post()
  async createCat(@Res() response, @Body() catData) {
    try {
      // Validate catData here
      if (!catData.name || !catData.age || !catData.color) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid cat data' });
      }
      const result = await this.createCatProxyModule.execute(catData);
      if (!result) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid cat data' });
      }
      response.status(HttpStatus.CREATED).json(result);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      response.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
    return response;
  }

  @Put(':id')
  async updateCat(@Res() response, @Param('id') id, @Body() catData) {
    try {
      const cat = await this.findByIdCatProxyModule.execute(id);
      if (!cat) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Cat not found' });
      }
      const result = await this.updateCatProxyModule.execute(id, catData);
      if (!result) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Cat not found' });
      }
      response.status(HttpStatus.OK).json(result);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      response.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
    return response;
  }

  @Delete(':id')
  async deleteCat(@Res() response, @Param('id') id) {
    try {
      const result = await this.deleteCatProxyModule.execute(id);
      Logger.log('deleteCat', result);
      if (!result) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Cat not found' });
      }
      return response.status(HttpStatus.NO_CONTENT).json();
    } catch (err) {
      this.logger.error(err.message, err.stack);
      response.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
    return response;
  }
}
