import { Cat } from 'src/domain/entities/cat';
import { ILogger } from 'src/domain/logger/logger.interface';
import { CatRepository } from 'src/domain/repositories/cat.repository';

export class UpdateCatService {
  constructor(
    private logger: ILogger,
    private catRepository: CatRepository,
  ) {}

  async execute(id: number, data): Promise<Cat> {
    try {
      const cat = await this.catRepository.getCatById(id);
      if (!cat) {
        throw new Error('Cat not found');
      }
      if (data.name) {
        cat.name = data.name;
      }
      if (data.age) {
        cat.age = data.age;
      }
      if (data.color) {
        cat.color = data.color;
      }
      await this.catRepository.updateCat(id, cat);
      return cat;
    } catch (error) {
      this.logger.error('UpdateCatService', error.message, error.stack);
    }
    return null;
  }
}
