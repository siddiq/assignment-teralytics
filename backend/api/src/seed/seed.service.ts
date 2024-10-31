import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteData } from '../entities/data.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(RouteData)
    private routeDataRepository: Repository<RouteData>,
  ) {}

  async seed() {
    // Read data from the JSON file
    const filePath = path.join(__dirname, '../../../db/data-small.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    for (const entry of data) {
      entry.trip_id = entry.trip_id;
      await this.routeDataRepository.save(entry);
    }

    console.log('Database seeded successfully');
  }
}
