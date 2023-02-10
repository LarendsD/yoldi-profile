import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ProfileService } from './profile.service';
import { Profile as ProfileDecorator } from './decorators/profile.decorator';
import { Profile } from '../entities/profile.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Files } from './interfaces/files.interface';
import { DeleteFiles } from './interfaces/delete-files.interface';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.profileService.findAll(paginationQuery);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  getLogged(@ProfileDecorator() profile: Profile) {
    return this.profileService.getLogged(profile);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.profileService.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  uploadFile(
    @Param('id') id: string,
    @UploadedFiles()
    files: Files,
  ) {
    return this.profileService.uploadFile(files, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/upload')
  deleteFiles(@Query() filesToDelete: DeleteFiles, @Param('id') id: string) {
    return this.profileService.deleteFile(filesToDelete, id);
  }
}
