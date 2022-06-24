import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({ name: 'original_title', type: 'varchar', nullable: false })
  originalTitle: string;

  @Column({ name: 'romanised_title', type: 'varchar', nullable: false })
  romanisedTitle: string;

  @Column({ name: 'release_year', type: 'int', nullable: false })
  releaseYear: number;

  @Column({ name: 'wiki_link', type: 'varchar', nullable: false })
  wikiLink: string;

  @Column({ name: 'music', type: 'varchar', nullable: false })
  music: string;

  @Column({ name: 'duration', type: 'int', nullable: false })
  duration: number;

  @Column({ name: 'cover', type: 'varchar', nullable: false })
  cover: string;

  @Column({ name: 'banner', type: 'varchar', nullable: false })
  banner: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'trailer', type: 'varchar', nullable: false })
  trailer: string;
}
