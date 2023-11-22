import { Injectable } from '@nestjs/common';
import { Cat } from 'src/domain/entities/cat';
import { CatRepository } from 'src/domain/repositories/cat.repository';

@Injectable()
export class CatRepositoryMemory implements CatRepository {
  async getCats() {
    return [
      new Cat('Cat1', 1, 'white'),
      new Cat('Cat12', 1, 'white'),
      new Cat('Cat12', 1, 'white'),
    ];
  }
}
