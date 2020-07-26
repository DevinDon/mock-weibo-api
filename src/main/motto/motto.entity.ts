import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Motto } from './motto.model';

@Entity('motto')
export class MottoEntity extends BaseEntity implements Motto {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  author?: string;

  @Column()
  content!: string;

  @Column()
  date!: number;

  @Column({ default: 0 })
  like!: number;

}
