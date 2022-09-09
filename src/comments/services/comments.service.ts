import { CatsRepository } from './../../cats/cats.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { Comments } from '../comments.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createComment(id: string, comments: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { contents, author } = comments;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author.toString);
      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat,
      });
      return await newComment.save();
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
