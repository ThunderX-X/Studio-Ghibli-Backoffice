import { User } from '../../database/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { AuthType } from './auth-types.entity';

@Entity({ name: 'multi_factor_auth_codes' })
export class MultiFactorAuthCode {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  code: string;

  @Column({ name: 'code_type', type: 'int', nullable: false })
  @ManyToOne(() => AuthType, (codeType) => codeType.id)
  codeType;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  @ManyToOne(() => User, (user) => user.id)
  userId;

  @Column({
    name: 'duration_seconds',
    type: 'int',
    nullable: false,
    default: 300,
  })
  secondsDuration: number;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: 'now()',
  })
  createdAt: Date;
}
