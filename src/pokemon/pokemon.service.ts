import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePookemonDto } from './dto/create-pokemon.dto';
import { UpdatePookemonDto } from './dto/update-pokemon.dto';
import { Connection, isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PookemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    @InjectConnection()
    private readonly connection: Connection,
    private readonly configService: ConfigService) {
    this.defaultLimit = this.configService.get<number>('defaultLimit')!;
    console.log('Default limit: ', this.defaultLimit);
  }

  async create(createPookemonDto: CreatePookemonDto) {
    createPookemonDto.name = createPookemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPookemonDto);
      return pokemon;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return await this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
      ;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no "${term}" is not found.`);
    }

    return pokemon;
  }

  async update(term: string, updatePookemonDto: UpdatePookemonDto) {

    const pokemon = await this.findOne(term);
    if (updatePookemonDto.name) updatePookemonDto.name = updatePookemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePookemonDto, { new: true });

    } catch (error) {
      this.handleExceptions(error);
    }

    return { ...pokemon.toJSON(), ...updatePookemonDto };
  }

  async remove(id: string) {
    // const result =await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount == 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }

    return;
  }

  async removeAll() {
    await this.pokemonModel.deleteMany({});
  }

  private handleExceptions(error: any) {
    console.log(error)
    if (error.code === 11000) throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
  }

  async createMany(createPookemonDtos: CreatePookemonDto[]) {

    try {
      const inserted = await this.pokemonModel.insertMany(createPookemonDtos);
      return { insertedCount: inserted.length, inserted };
    } catch (error) {
      // Si hay errores parciales, Mongo devuelve writeErrors; intentamos extraer lo insertado
      if (error?.result?.nInserted != null) {
        return { insertedCount: error.result.nInserted, inserted: [] };
      }
      throw new BadRequestException('Error creating multiple pokemons', error?.message || error);
    }
  }

  /**
  * Inserta en lote de forma atómica: si ocurre cualquier error, se aborta
  * y no se insertará ningún documento.
  */
  async createManyAtomic(createDtos: CreatePookemonDto[]) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.pokemonModel.insertMany(createDtos, { session });
      await session.commitTransaction();
      session.endSession();
      return { insertedCount: createDtos.length };
    } catch (error) {
      console.log(error)
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestException('No se insertó ninguno. ' + (error?.message ?? 'Error desconocido'));
    }
  }
}
