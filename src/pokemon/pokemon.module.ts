import { Module } from '@nestjs/common';
import { PookemonService } from './pokemon.service';
import { PookemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PookemonController],
  providers: [PookemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ])
  ],
  exports: [PookemonService, MongooseModule]
})
export class PookemonModule { }
