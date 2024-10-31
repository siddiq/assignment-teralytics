import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RouteData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  route_short_name: string;

  @Column()
  route_id: string;

  @Column()
  trip_id: string; // Use string type for trip_id

  @Column()
  stop_id: string;

  @Column()
  stop_sequence: number;

  @Column('float')
  stop_lat: number;

  @Column('float')
  stop_lon: number;

  @Column()
  departure_time: string;

  @Column()
  date: string;

  @Column()
  boarding: number;

  @Column()
  alighting: number;

  @Column()
  load: number;
}
