import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import type Skill from './Skill';
import type Wilder from './Wilder';

@Entity('Vote')
export default class Vote {
  @PrimaryColumn()
  public wilderId!: string;

  @PrimaryColumn()
  public skillId!: string;

  @ManyToOne('Wilder', (wilder: Wilder) => wilder.votes)
  public wilder!: Wilder;

  @ManyToOne('Skill', (skill: Skill) => skill.votes)
  public skill!: Skill;

  @Column()
  count!: number;
}
