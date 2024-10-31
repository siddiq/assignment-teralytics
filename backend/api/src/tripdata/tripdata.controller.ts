import { Controller, Get } from '@nestjs/common';
import { TripdataService } from './tripdata.service';
import { RouteData } from '../entities/data.entity';

@Controller('api/v1/tripdata')
export class TripdataController {
  constructor(private readonly tripDataService: TripdataService) {}

  @Get()
  async getAllTripData(): Promise<RouteData[]> {
    return this.tripDataService.getAllTrips();
  }
}
