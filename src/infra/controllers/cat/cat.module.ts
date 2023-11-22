import { UseCaseProxyModule } from 'src/infra/depences-proxy/usecase-proxy.module';
import { CatController } from './cat.controller';
import { Module } from '@nestjs/common';
import { GlobalProvidersModule } from 'src/infra/depences/global.provider.module';

@Module({
  imports: [GlobalProvidersModule, UseCaseProxyModule.register()],
  controllers: [CatController],
})
export class CatModule {}
