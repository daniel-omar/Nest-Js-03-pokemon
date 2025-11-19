import { PartialType } from '@nestjs/mapped-types';
import { CreatePookemonDto } from './create-pokemon.dto';

export class UpdatePookemonDto extends PartialType(CreatePookemonDto) {}
