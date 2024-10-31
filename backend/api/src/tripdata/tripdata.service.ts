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

  // Fetch all TripData records from the database
  async getAllTrips(): Promise<RouteData[]> {
    return this.routeDataRepository.find();
  }
}
