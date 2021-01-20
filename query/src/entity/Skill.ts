import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Vote } from "./Vote";

@Entity()
export class Skill extends BaseEntity {
  
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  
  @OneToMany(()=>Vote, (vote:Vote)=>vote.skill)
  public votes: Vote[]
}
