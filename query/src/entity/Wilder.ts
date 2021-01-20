import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Vote } from "./Vote";

@Entity()
export class Wilder extends BaseEntity {
  
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @OneToMany(()=>Vote, (vote:Vote)=>vote.wilder)
  public votes: Vote[]
}