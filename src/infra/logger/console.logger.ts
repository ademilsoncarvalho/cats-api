import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';

@Injectable()
export class ConsoleLogger extends Logger implements ILogger {
  debug(context: string, message: string) {
    super.debug(`[DEBUG] ${message}`, context);
  }
  log(context: string, message: string) {
    super.log(`[INFO] ${message}`, context);
  }
  error(context: string, message: string, trace?: string) {
    super.error(`[ERROR] ${message}`, trace, context);
  }
  warn(context: string, message: string) {
    super.warn(`[WARN] ${message}`, context);
  }
  verbose(context: string, message: string) {
    super.verbose(`[VERBOSE] ${message}`, context);
  }
}
