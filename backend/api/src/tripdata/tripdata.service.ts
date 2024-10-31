import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteData } from '../entities/data.entity';

@Injectable()
export class TripdataService {
  constructor(
    @InjectRepository(RouteData)
    private routeDataRepository: Repository<RouteData>,
  ) {}

  async getAllTrips(): Promise<RouteData[]> {
    return this.routeDataRepository.find({
      order: {
        route_id: 'ASC',
        trip_id: 'ASC',
        stop_sequence: 'ASC',
      },
    });
  }
}
