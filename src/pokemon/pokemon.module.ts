import { Module } from '@nestjs/common';
import { PookemonService } from './pokemon.service';
import { PookemonController } from './pokemon.controller';

@Module({
  controllers: [PookemonController],
  providers: [PookemonService],
})
export class PookemonModule {}
