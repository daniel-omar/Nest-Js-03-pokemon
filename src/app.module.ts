import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PookemonModule } from './pokemon/pokemon.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './config/env.config';
import { joiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      validationSchema: joiValidationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/'
    }),

    MongooseModule.forRoot(envConfiguration().mongodb!, {
      dbName: 'pokemondb'
    }),

    PookemonModule,

    CommonModule,

    SeedModule
  ]
})
export class AppModule {
  constructor() {
    // console.log(process.env);
  }
}
