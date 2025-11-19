import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PookemonService } from './pokemon.service';
import { CreatePookemonDto } from './dto/create-pokemon.dto';
import { UpdatePookemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PookemonController {
  constructor(private readonly pookemonService: PookemonService) {}

  @Post()
  create(@Body() createPookemonDto: CreatePookemonDto) {
    return this.pookemonService.create(createPookemonDto);
  }

  @Get()
  findAll() {
    return this.pookemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pookemonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePookemonDto: UpdatePookemonDto) {
    return this.pookemonService.update(+id, updatePookemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pookemonService.remove(+id);
  }
}
