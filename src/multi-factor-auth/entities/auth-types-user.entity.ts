import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthType } from './auth-types.entity';

@Entity({ name: 'auth_types_user' })
class AuthTypeUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  @ManyToOne(() => User, (user) => user.id)
  userId: number;

  @Column({ name: 'auth_type_id', type: 'int', nullable: false })
  @ManyToOne(() => AuthType, (authType) => authType.id)
  authTypeId: number;

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
