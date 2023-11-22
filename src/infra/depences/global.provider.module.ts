import { Global, Module } from '@nestjs/common';
import { ConsoleLogger } from '../logger/console.logger';
import { CatRepositoryMemory } from '../repository/cat.repository.memory';

@Global()
@Module({
  providers: [
    {
      provide: 'ILogger',
      useClass: ConsoleLogger,
    },
    {
      provide: 'CatRepository',
      useClass: CatRepositoryMemory,
    },
  ],
  exports: ['ILogger', 'CatRepository'],
})
export class GlobalProvidersModule {
  static LOGGER = 'ILogger';
  static CAT_REPO = 'CatRepository';
}
