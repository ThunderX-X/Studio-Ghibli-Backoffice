/* eslint-disable prettier/prettier */

//import { Length } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  //@Column({type: 'number', length: 255 })
  id: number;

  @Column({type: 'varchar', length: 255 })
  first_name: string;

  @Column({type: 'varchar', length: 255})
  last_name: string;

  @Column({type: 'text' })
  email: string;

  @Column({type: 'boolean' })
  active: string;

  @Column({type: 'text' })
  profile_picture: string;

  @Column({type: 'varchar' })
  password: string;

  @Column({type: 'varchar' })
  rol_id: string;
  //created_at: string;
  //updated_at: string;
}
