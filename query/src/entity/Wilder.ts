import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Vote from './Vote';

@Entity('Wilder')
@ObjectType()
export default class Wilder extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  city!: string;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote: Vote) => vote.wilder)
  public votes!: Vote[];
}
