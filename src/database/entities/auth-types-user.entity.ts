import { User } from './user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthType } from './auth-types.entity';

@Entity({ name: 'auth_types_user' })
export class AuthTypeUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => AuthType, (authType) => authType.id, { nullable: false })
  @JoinColumn({ name: 'auth_type_id' })
  authType: number;

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
