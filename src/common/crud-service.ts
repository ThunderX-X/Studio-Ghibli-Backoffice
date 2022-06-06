import { FindConditions, getRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import 'reflect-metadata';
import { DeepPartial } from 'typeorm';

type ObjectType<T> = { new (): T };

export default abstract class CrudService<Entity> {
  private _repository: Repository<Entity>;
  private type: ObjectType<Entity>;

  constructor(type: ObjectType<Entity>) {
    this.type = type;
  }
  get repository() {
    if (!this._repository) {
      this._repository = getRepository(this.type);
    }
    return this._repository;
  }

  protected async getAll(
    filters: FindConditions<Entity> = {},
    relations: string[] = [],
  ): Promise<Entity[]> {
    return await this.repository.find({
      relations,
      where: filters,
    });
  }

  protected async getOneById(
    id: any,
    filters: FindConditions<Entity> = {},
    relations: string[] = [],
  ): Promise<Entity> {
    if (!id) return null;
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

  protected async modify(id: any, changes: DeepPartial<Entity>) {
    if (!id) throw new NotFoundException('Invalid id');
    const entityToUpdate: Entity = await this.getOneById(id);
    this.repository.merge(entityToUpdate, changes);
    return await this.repository.save(entityToUpdate as any);
  }

  protected async remove(id: any) {
    if (!id) throw new NotFoundException('Invalid id');
    return this.repository.delete(id);
  }

  protected async removeByConditions(deleteConditions: FindConditions<Entity>) {
    return this.repository.delete(deleteConditions);
  }

  protected async make(entity: DeepPartial<Entity>) {
    const newEntity = await this.repository.create(entity);
    return await this.repository.save(newEntity as DeepPartial<Entity>);
  }
}
