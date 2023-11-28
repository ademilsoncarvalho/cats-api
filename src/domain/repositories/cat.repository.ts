import { Cat } from '../entities/cat';

export interface CatRepository {
  getCats(): Promise<Cat[]>;
  getCatById(id: number): Promise<Cat | undefined>;
  createCat(cat: Cat): Promise<Cat>;
  updateCat(id: number, cat: Cat): Promise<Cat | undefined>;
  deleteCat(id: number): Promise<boolean>;
}
