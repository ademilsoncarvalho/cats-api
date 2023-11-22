import { Cat } from '../entities/cat';

export interface CatRepository {
  getCats(): Promise<Cat[]>;
}
