import { ILogger } from 'src/domain/logger/logger.interface';
import { CatRepository } from 'src/domain/repositories/cat.repository';

export class DeleteCatService {
  constructor(
    private logger: ILogger,
    private catRepository: CatRepository,
  ) {}

  async execute(id: number): Promise<boolean> {
    try {
      const cat = await this.catRepository.getCatById(id);
      if (!cat) {
        throw new Error('Cat not found');
      }
      await this.catRepository.deleteCat(id);
      return true;
    } catch (error) {
      this.logger.error('DeleteCatService', error.message, error.stack);
    }
    return false;
  }
}
