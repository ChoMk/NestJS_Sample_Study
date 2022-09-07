import { CatRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string) {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
