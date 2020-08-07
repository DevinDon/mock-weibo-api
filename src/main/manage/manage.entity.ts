import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Manage } from './manage.model';

@Entity('manage')
export class ManageEntity extends BaseEntity implements Manage {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  content?: string;

}
