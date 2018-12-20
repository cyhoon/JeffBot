import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity()
class WorkHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  historyTime: Date;

  @Column()
  userId: string;
}

export default WorkHistory;
