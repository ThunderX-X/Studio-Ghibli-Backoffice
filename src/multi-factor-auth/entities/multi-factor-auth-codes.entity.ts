import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CodeType } from './code-types.entity';

@Entity({ name: 'multi_factor_auth_codes' })
export class MultiFactorAuthCode {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  code: string;

  @Column({ name: 'code_type', type: 'int', nullable: false })
  codeType;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  @ManyToOne(() => CodeType, (codeType) => codeType.id)
  userId;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: 'now()',
  })
  createdAt: Date;
}
