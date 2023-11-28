import { Injectable, Logger } from '@nestjs/common';
import { Cat } from 'src/domain/entities/cat';
import { CatRepository } from 'src/domain/repositories/cat.repository';

@Injectable()
export class CatRepositoryMemory implements CatRepository {
  private cats: Cat[] = [];

  async getCats(): Promise<Cat[]> {
    return this.cats;
  }

  async getCatById(id: number): Promise<Cat | undefined> {
    return this.cats.find((cat) => cat.id.toString() === id.toString());
  }

  async createCat(cat: Cat): Promise<Cat> {
    const lastId =
      this.cats.length > 0 ? this.cats[this.cats.length - 1].id : 0;
    cat.id = lastId + 1;
    this.cats.push(cat);
    return cat;
  }

  async updateCat(id: number, cat: Cat): Promise<Cat | undefined> {
    const index = this.cats.findIndex((c) => c.id.toString() === id.toString());
    if (index !== -1) {
      this.cats[index] = cat;
      return cat;
    }
    return undefined;
  }

  async deleteCat(id: number): Promise<boolean> {
    const index = this.cats.findIndex(
      (cat) => cat.id.toString() === id.toString(),
    );
    Logger.log('deleteCat', index);
    if (index !== -1) {
      this.cats.splice(index, 1);
      Logger.log('deleteCat', 'feito');
      return true;
    }
    return false;
  }
}
