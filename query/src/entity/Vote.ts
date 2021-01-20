import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@Entity()
export class Vote {

  @PrimaryGeneratedColumn()
  public voteID!: number;

  @ManyToOne(() => Wilder, (wilder:Wilder) => wilder.votes)
  public wilder!: Wilder;

  @ManyToOne(() => Skill, (skill:Skill) => skill.votes)
  public skill!: Skill;
  
  @Column()
  count: number;
}