import { Injectable } from '@nestjs/common';
import { HttpAdapter } from 'src/integration/domain/http-adapter';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PookemonService } from 'src/pokemon/pokemon.service';
import { CreatePookemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly pokemonService: PookemonService
  ) { }

  async executSeed() {
    await this.pokemonService.removeAll();

    const { results: data } = await this.httpAdapter.send<PokeResponse>({ method: 'GET', url: 'https://pokeapi.co/api/v2/pokemon?limit=10' });
    console.log(data);
    const createPokemons: CreatePookemonDto[] = [];
    data.forEach(async ({ name, url }) => {
      const segments = url.split("/");
      const id: number = +segments[segments.length - 2];
      createPokemons.push({ name, no: id });
    });

    await this.pokemonService.createMany(createPokemons);

    return data;
  }
}
