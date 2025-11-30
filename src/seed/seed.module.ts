import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AxiosHttpAdapter } from 'src/integration/infraestructure/axios-http-adapter/axios-http-adapter';
import { HttpAdapter } from 'src/integration/domain/http-adapter';

@Module({
  controllers: [SeedController],
  providers: [SeedService,
    {
      provide: HttpAdapter,
      useClass: AxiosHttpAdapter
    }
  ],
})
export class SeedModule { }
