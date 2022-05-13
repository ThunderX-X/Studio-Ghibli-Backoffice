import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth_types' })
export class AuthType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description', type: 'varchar', length: 40, nullable: false })
  description: string;

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
