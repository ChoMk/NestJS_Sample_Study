import { CommentsCreateDto } from './../dto/comments.create.dto';
import { CommentsService } from './../services/comments.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @ApiOperation({
    summary: 'all comment',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: 'all comment',
  })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(id, body);
  }

  @ApiOperation({
    summary: '좋아요 올리기',
  })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService, this.plusLike(id);
  }
}
