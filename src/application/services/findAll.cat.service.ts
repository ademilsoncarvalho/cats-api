import { Cat } from 'src/domain/entities/cat';
import { ILogger } from 'src/domain/logger/logger.interface';
import { CatRepository } from 'src/domain/repositories/cat.repository';

export class FindAllCatService {
  constructor(
    private logger: ILogger,
    private catRepository: CatRepository,
  ) {}

  async execute(): Promise<Cat[]> {
    try {
      const cats = await this.catRepository.getCats();
      return cats;
    } catch (error) {
      this.logger.error('FindAllCatService', error.message, error.stack);
    }
    return [];
  }
}
