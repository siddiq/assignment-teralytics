import { Module } from '@nestjs/common';
import { TripdataController } from './tripdata.controller';
import { TripdataService } from './tripdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteData } from '../entities/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteData])], // Import TypeOrmModule with RouteData
  controllers: [TripdataController],
  providers: [TripdataService],
})
export class TripdataModule {}
