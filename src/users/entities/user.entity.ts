import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @IsEmail()
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

  @Column({ name: 'password', type: 'varchar', length: 256, nullable: false })
  password: string;

  @Column({ name: 'role_id', type: 'int', nullable: false })
  roleId: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    default: 'now()',
  })
  updatedAt: Date;
}
