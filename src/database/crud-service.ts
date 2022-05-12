import { FindConditions, getRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import 'reflect-metadata';

type ObjectType<T> = { new (): T };

export default abstract class CrudService<EntityClass> {
  private _repository: Repository<EntityClass>;
  private type: ObjectType<EntityClass>;

  constructor(type: ObjectType<EntityClass>) {
    this.type = type;
  }
  get repository() {
    if (!this._repository) {
      this._repository = getRepository(this.type);
    }
    return this._repository;
  }

  async findAll(
    filters: FindConditions<EntityClass> = {},
    relations: string[] = [],
  ): Promise<EntityClass[]> {
    return await this.repository.find({
      relations,
      where: filters,
    });
  }

  async findOneById(
    id: number,
    filters: FindConditions<EntityClass> = {},
    relations: string[] = [],
  ): Promise<EntityClass> {
    const entity = this.repository.findOneOrFail({ relations });
    if (!entity)
      throw new NotFoundException(
        `Can't find the row with id: ${id} and conditions ${filters}`,
      );
    return entity;
  }

  async update(id: number, changes: any) {
    const entityToUpdate: EntityClass = await this.findOneById(id);
    this.repository.merge(entityToUpdate, changes);
    return await this.repository.save(entityToUpdate as any);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
