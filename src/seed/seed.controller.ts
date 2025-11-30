import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { HttpAdapter } from 'src/integration/domain/http-adapter';
import { PokeResponse } from './interfaces/poke-response.interface';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService,
    private readonly httpAdapter: HttpAdapter
  ) { }

  @Get()
  async executeSeed() {
    const { results: data } = await this.httpAdapter.send<PokeResponse>({ method: 'GET', url: 'https://pokeapi.co/api/v2/pokemon?limit=650' });

    data.forEach(async ({ name, url }) => {
      const segments = url.split("/");
      const id: number = +segments[segments.length - 2];
      console.log({ id, name, url });
    });

    return data;
  }
}
