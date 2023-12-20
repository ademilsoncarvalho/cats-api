import { Cat } from 'src/domain/entities/cat';
import { ILogger } from 'src/domain/logger/logger.interface';
import { CatRepository } from 'src/domain/repositories/cat.repository';

export class CreateCatService {
  constructor(
    private logger: ILogger,
    private catRepository: CatRepository,
  ) {}

  async execute(data): Promise<Cat> {
    try {
      // Validate data here
      if (!data.name || !data.age || !data.color) {
        throw new Error('Invalid cat data');
      }
      let cat = new Cat(null, data.name, data.age, data.color);
      cat = await this.catRepository.createCat(cat);
      return cat;
    } catch (error) {
      this.logger.error('CreateCatService', error.message, error.stack);
    }
    return null;
  }
}
