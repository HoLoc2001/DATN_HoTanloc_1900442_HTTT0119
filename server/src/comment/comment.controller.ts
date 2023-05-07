import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Comment, GetArticleId, GetCommentId } from './dto';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get(':articleId')
  async getCommentsByArticleId(@Param() params: GetArticleId) {
    return await this.commentService.getCommentsByArticleId(params.articleId);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':articleId')
  async addComment(
    @Param() params: GetArticleId,
    @Body() dto: Comment,
    @GetUser() user: User,
  ) {
    return await this.commentService.addComment(
      params.articleId,
      dto.content,
      user['userId'],
    );
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':commentId')
  async updateComment(
    @Param() params: GetCommentId,
    @Body() dto: Comment,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const comment = await this.commentService.updateComment(
      params.commentId,
      dto.content,
      user['userId'],
    );

    if (comment) {
      return res.status(HttpStatus.OK).json(comment);
    }
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, msg: 'INTERNAL_SERVER_ERROR' });
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':commentId')
  async deleteComment(
    @Param() params: GetCommentId,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const comment = await this.commentService.deleteComment(
      params.commentId,
      user['userId'],
    );

    if (comment) {
      return res.status(HttpStatus.OK).json({ statusCode: 200, msg: 'OK' });
    }
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, msg: 'INTERNAL_SERVER_ERROR' });
  }
}
