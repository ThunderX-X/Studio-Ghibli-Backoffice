import { User } from '../../database/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { AuthType } from './auth-types.entity';

@Entity({ name: 'multi_factor_auth_codes' })
export class MultiFactorAuthCode {
  @PrimaryColumn({ type: 'varchar', length: 400 })
  code: string;

  @ManyToOne(() => AuthType, (codeType) => codeType.id, { nullable: false })
  @JoinColumn({ name: 'code_type' })
  codeType: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({
    name: 'duration_seconds',
    type: 'int',
    nullable: false,
    default: 300,
  })
  secondsDuration: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;
}
