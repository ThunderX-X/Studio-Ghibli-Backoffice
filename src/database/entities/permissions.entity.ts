import { Module } from './modules.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Module, (module) => module.id, { nullable: false })
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column({ name: 'module_id', type: 'int', nullable: false })
  @Exclude()
  moduleId: number;

  @Column({ name: 'name', type: 'varchar', length: 40, nullable: false })
  name: string;

  @Column({ name: 'create', type: 'boolean', nullable: false, default: false })
  create: boolean;

  @Column({ name: 'read', type: 'boolean', nullable: false, default: false })
  read: boolean;

  @Column({ name: 'update', type: 'boolean', nullable: false, default: false })
  update: boolean;

  @Column({ name: 'delete', type: 'boolean', nullable: false, default: false })
  delete: boolean;

  @Column({ name: 'active', type: 'boolean', nullable: false, default: false })
  active: boolean;

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
