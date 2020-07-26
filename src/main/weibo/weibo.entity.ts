import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Weibo } from './weibo.model';

@Entity('weibo')
export class WeiboEntity extends BaseEntity implements Weibo {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  content?: string;

}
