import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesBodyDto } from '../../dto/notesBody.dto';
import { NotesQueryDto } from '../../dto/notesQuery.dto';
import { NotesParamDto } from '../../dto/notesParam.dto';
import { AuthGuard } from '../../guards/authGuard/auth.guard';
import { NotesGuard } from '../../guards/notesGuard/notes.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @UseGuards(AuthGuard)
  @Get()
  getAll(@Query() { offset, limit }: NotesQueryDto, @Req() req) {
    return this.notesService.getAllNotes(offset, limit, req.user.id);
  }
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  addNew(@Body() { text }: NotesBodyDto, @Req() req) {
    return this.notesService.addNewNote(text, req.user.id);
  }
  @UseGuards(NotesGuard)
  @UseGuards(AuthGuard)
  @Get('/:id')
  get(@Param() { id }: NotesParamDto) {
    return this.notesService.getOne(id);
  }
  @UseGuards(NotesGuard)
  @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param() { id }: NotesParamDto, @Body() { text }: NotesBodyDto) {
    return this.notesService.updateOne(id, text);
  }
  @UseGuards(NotesGuard)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  chek(@Param() { id }: NotesParamDto) {
    return this.notesService.checkOne(id);
  }
  @UseGuards(NotesGuard)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param() { id }: NotesParamDto, @Req() req) {
    return this.notesService.deleteOne(id, req.user.id);
  }
}
