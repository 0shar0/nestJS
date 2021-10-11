import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  writeFileSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
} from 'fs';
import { CreateFileDto } from './dto/create-file.dto';
import {
  baseFolderURL,
  createdSuccessfully,
  serverError,
  success,
} from './constant/constant';
import { resolve, extname } from 'path';
import { IAllFiles, ISuccess, IFileContent } from './types';

@Injectable()
export class AppService {
  create({ filename, content }: CreateFileDto): ISuccess {
    try {
      writeFileSync(resolve(baseFolderURL, filename), content);
      return { message: createdSuccessfully };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  getAll(): IAllFiles | HttpException {
    try {
      const files = readdirSync(resolve(baseFolderURL));
      return {
        message: success,
        files,
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  get(filename: string): IFileContent {
    try {
      const content = readFileSync(resolve(baseFolderURL, filename), 'utf8');
      return {
        message: success,
        filename,
        content,
        extension: extname(filename),
        uploadedDate: statSync(resolve(baseFolderURL, filename)).birthtime,
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
  update(filename: string, content): ISuccess {
    writeFileSync(resolve(baseFolderURL, filename), content);
    return {
      message: success,
    };
  }
  delete(filename: string): ISuccess {
    try {
      unlinkSync(resolve(baseFolderURL, filename));
      return {
        message: success,
      };
    } catch (e) {
      throw new InternalServerErrorException({ message: serverError });
    }
  }
}
