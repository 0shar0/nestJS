import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('api/files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateFileDto) {
    return this.appService.create(body);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.appService.getAll();
  }
  @Put('/:filename')
  @HttpCode(HttpStatus.OK)
  update(
    @Body('content') content: UpdateFileDto,
    @Param('filename') filename: string,
  ) {
    return this.appService.update(filename, content);
  }
  @Get('/:filename')
  @HttpCode(HttpStatus.OK)
  get(@Param('filename') filename: string) {
    return this.appService.get(filename);
  }
  @Delete('/:filename')
  @HttpCode(HttpStatus.OK)
  delete(@Param('filename') filename: string) {
    return this.appService.delete(filename);
  }
}
