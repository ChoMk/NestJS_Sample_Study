import { CatsModule } from './../cats/cats.module';
import { Comments, CommentsSchema } from './comments.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [
    CatsModule,
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
