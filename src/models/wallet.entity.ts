import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

@Entity('wallets')
export class Wallet extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int4')
  account_id: number;

  @Column('int4')
  currency_id: number;

  @Column('varchar')
  address: string;

  @Exclude()
  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Exclude()
  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @BeforeInsert()
  async updateDateCreation() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updated_at = new Date();
  }

  toJSON() {
    return classToPlain(this);
  }
}
