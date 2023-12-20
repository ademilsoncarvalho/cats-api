import { Cat } from 'src/domain/entities/cat';
import { ILogger } from 'src/domain/logger/logger.interface';
import { CatRepository } from 'src/domain/repositories/cat.repository';

export class FindByIdCatService {
  constructor(
    private logger: ILogger,
    private catRepository: CatRepository,
  ) {}

  async execute(id: number): Promise<Cat> {
    try {
      const cat = await this.catRepository.getCatById(id);
      return cat;
    } catch (error) {
      this.logger.error('FindByIdCatService', error.message, error.stack);
    }
    return null;
  }
}
