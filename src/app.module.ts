import { Module } from '@nestjs/common';
import { CatModule } from './infra/controllers/cat/cat.module';
@Module({
  imports: [CatModule],
})
export class AppModule {}
