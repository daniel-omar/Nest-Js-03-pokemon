import { Injectable } from '@nestjs/common';
import { CreatePookemonDto } from './dto/create-pokemon.dto';
import { UpdatePookemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PookemonService {
  create(createPookemonDto: CreatePookemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePookemonDto: UpdatePookemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
