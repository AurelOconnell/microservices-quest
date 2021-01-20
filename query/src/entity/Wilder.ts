import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import type Vote from './Vote';

@Entity('Wilder')
export default class Wilder extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  city!: string;

  @OneToMany('Vote', (vote: Vote) => vote.wilder)
  public votes!: Vote[];
}
