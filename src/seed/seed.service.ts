import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {

  executSeed() {
    return `This action returns all seed`;
  }
}
