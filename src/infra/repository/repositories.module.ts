import { Module } from '@nestjs/common';
import { CatRepositoryMemory } from './cat.repository.memory';

@Module({
  providers: [CatRepositoryMemory],
  exports: [CatRepositoryMemory],
})
export class RepositoriesModule {}
