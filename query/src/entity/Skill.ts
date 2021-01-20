import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import type Vote from './Vote';

@Entity('Skill')
export default class Skill extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @OneToMany('Vote', (vote: Vote) => vote.skill)
  public votes!: Vote[];
}
