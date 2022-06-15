import { Exclude } from 'class-transformer';
import { Role } from 'src/database/entities/roles.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 75, nullable: false })
  email: string;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  active: boolean;

  @Column({
    name: 'profile_picture',
    type: 'text',
    nullable: true,
  })
  profilePicture: string;

  @Column({ name: 'password', type: 'varchar', length: 512, nullable: true })
  @Exclude()
  password: string;

  @ManyToOne(() => Role, (role) => role.id, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'facebook_id', type: 'varchar', length: 256, nullable: true })
  facebookId: string;

  @Column({ name: 'twitter_id', type: 'varchar', length: 256, nullable: true })
  twitterId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'now()',
  })
  updatedAt: Date;
}
