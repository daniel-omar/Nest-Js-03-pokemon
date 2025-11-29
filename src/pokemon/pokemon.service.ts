import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePookemonDto } from './dto/create-pokemon.dto';
import { UpdatePookemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PookemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }

  async create(createPookemonDto: CreatePookemonDto) {
    createPookemonDto.name = createPookemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPookemonDto);
      return pokemon;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
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

  private handleExceptions(error: any) {
    console.log(error)
    if (error.code === 11000) throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
  }
}
