import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { PookemonService } from './pokemon.service';
import { CreatePookemonDto } from './dto/create-pokemon.dto';
import { UpdatePookemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PookemonController {
  constructor(private readonly pookemonService: PookemonService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPookemonDto: CreatePookemonDto) {
    return this.pookemonService.create(createPookemonDto);
  }

  @Get()
  findAll() {
    return this.pookemonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pookemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePookemonDto: UpdatePookemonDto) {
    return this.pookemonService.update(term, updatePookemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pookemonService.remove(id);
  }
}
