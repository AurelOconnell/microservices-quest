import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import Skill from './Skill';
import type Wilder from './Wilder';

@Entity('Vote')
@ObjectType()
export default class Vote {
  @Field(() => String)
  @PrimaryColumn()
  public wilderId!: string;

  @Field(() => String)
  @PrimaryColumn()
  public skillId!: string;

  @ManyToOne('Wilder', (wilder: Wilder) => wilder.votes)
  public wilder!: Wilder;

  @Field(() => Skill)
  @ManyToOne('Skill', (skill: Skill) => skill.votes)
  public skill!: Skill;

  @Field(() => Int)
  @Column()
  count!: number;
}
