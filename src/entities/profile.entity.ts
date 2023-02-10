import { nanoid } from 'nanoid';
import { encrypt } from 'src/profile/secure/encrypt';
import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryColumn,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryColumn('varchar', { length: 30 })
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, type: 'text' })
  avatar?: string | Buffer;

  @Column({ nullable: true, type: 'text' })
  cover?: string | Buffer;

  @Column()
  password?: string;

  @Column({ unique: true })
  slug: string;

  @BeforeInsert()
  setSlugAndId?() {
    this.id = nanoid();
    this.slug = this.id;
  }

  @BeforeInsert()
  encryptPass?() {
    this.password = encrypt(this.password);
  }

  tempPassword?: string;

  @AfterLoad()
  async loadTempPassword?() {
    this.tempPassword = this.password;
  }

  @BeforeUpdate()
  async hashPasswordIfNew?() {
    if (this.tempPassword !== this.password) {
      this.password = encrypt(this.password);
    }
  }
}
