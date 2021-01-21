import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import type Vote from './Vote';

@Entity('Skill')
@ObjectType()
export default class Skill extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field(() => String)
  @Column()
  title!: string;

  @OneToMany('Vote', (vote: Vote) => vote.skill)
  public votes!: Vote[];
}
