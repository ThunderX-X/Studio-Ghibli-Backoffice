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

  protected async findAll(
    filters: FindConditions<EntityClass> = {},
    relations: string[] = [],
  ): Promise<EntityClass[]> {
    return await this.repository.find({
      relations,
      where: filters,
    });
  }

  protected async findOneById(
    id: any,
    filters: FindConditions<EntityClass> = {},
    relations: string[] = [],
  ): Promise<EntityClass> {
    const entity = this.repository.findOneOrFail(id, {
      relations,
      where: filters,
    });
    if (!entity)
      throw new NotFoundException(
        `Can't find the row with id: ${id} and conditions ${filters}`,
      );
    return entity;
  }

  protected async modify(id: any, changes: any) {
    const entityToUpdate: EntityClass = await this.findOneById(id);
    this.repository.merge(entityToUpdate, changes);
    return await this.repository.save(entityToUpdate as any);
  }

  protected async remove(id: any) {
    return this.repository.delete(id);
  }
}
