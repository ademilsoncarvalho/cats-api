import { Module } from '@nestjs/common';
import { ConsoleLogger } from './console.logger';

@Module({
  providers: [ConsoleLogger],
  exports: [ConsoleLogger],
})
export class LoggerModule {}
