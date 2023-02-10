import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ProfileList } from './interfaces/profile-list.interface';
import { Files } from './interfaces/files.interface';
import * as fs from 'fs';
import { nanoid } from 'nanoid';
import * as path from 'path';
import { DeleteFiles } from './interfaces/delete-files.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    profile.username = createProfileDto.username;
    profile.email = createProfileDto.email;
    profile.password = createProfileDto.password;
    const { email, username, id, slug } = await this.profileRepository.save(
      profile,
    );

    return { email, username, id, slug };
  }

  async findByEmail(email: string): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<ProfileList> {
    const { page, perPage } = paginationQuery;

    const [profiles, totalCount] = await this.profileRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        email: true,
        username: true,
        description: true,
        slug: true,
        avatar: true,
        cover: true,
      },
    });

    return {
      data: profiles,
      pagination: {
        page: Number(page),
        perPage: Number(perPage),
        pageCount: Math.ceil(totalCount / perPage),
      },
    };
  }

  async findOne(id: string): Promise<Profile> {
    return this.profileRepository.findOne({
      select: {
        avatar: true,
        description: true,
        id: true,
        username: true,
        slug: true,
        email: true,
        cover: true,
      },
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const { ...data } = updateProfileDto;
    const currentProfile = await this.profileRepository.findOneBy({ id });
    const updatedProfile = this.profileRepository.merge(currentProfile, data);
    const { password, tempPassword, ...profile } =
      await this.profileRepository.save(updatedProfile);
    return profile;
  }

  async delete(id: string): Promise<void> {
    await this.profileRepository.delete(id);
  }

  async getLogged(profile: Profile): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id: profile.id },
      select: {
        id: true,
        username: true,
        email: true,
        description: true,
        slug: true,
        avatar: true,
        cover: true,
      },
    });
  }

  async getBySlug(slug: string): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { slug },
      select: {
        id: true,
        username: true,
        email: true,
        description: true,
        slug: true,
        avatar: true,
        cover: true,
      },
    });
  }

  private async uploadMedia(media: any, id: string): Promise<Profile> {
    const filePath = `./files/${nanoid()}${path.parse(media.originalname).ext}`;
    fs.writeFileSync(filePath, media.buffer);

    const currentProfile = await this.profileRepository.findOneBy({ id });
    if (currentProfile[`${media.fieldname}`]) {
      fs.unlinkSync(currentProfile[`${media.fieldname}`]);
      await this.profileRepository.update(id, { [`${media.fieldname}`]: null });
    }

    const updatedProfile = this.profileRepository.merge(currentProfile, {
      [`${media.fieldname}`]: filePath,
    });
    const { password, tempPassword, ...profile } =
      await this.profileRepository.save(updatedProfile);
    return profile;
  }

  async uploadFile(file: Files, id: string): Promise<Profile> {
    if (file.avatar) {
      return this.uploadMedia(file.avatar[0], id);
    }
    return this.uploadMedia(file.cover[0], id);
  }

  async deleteFile(filesToDelete: DeleteFiles, id: string): Promise<Profile> {
    const profile = await this.findOne(id);
    if (filesToDelete.avatar === '' && profile?.avatar) {
      fs.unlinkSync(profile.avatar);
      await this.profileRepository.update(id, { avatar: null });
      profile.avatar = null;
    }
    if (filesToDelete.cover === '' && profile?.cover) {
      fs.unlinkSync(profile.cover);
      await this.profileRepository.update(id, { cover: null });
      profile.cover = null;
    }
    return profile;
  }
}
