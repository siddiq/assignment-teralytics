import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedService } from './seed/seed.service';
import { RouteData } from './entities/data.entity';
import { TripdataService } from './tripdata/tripdata.service';
import { TripdataController } from './tripdata/tripdata.controller';
import { TripdataModule } from './tripdata/tripdata.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'myuser',
        password: 'mypassword',
        database: 'mydatabase',
        // host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get<string>('DB_USERNAME'),
        // password: configService.get<string>('DB_PASSWORD'),
        // database: configService.get<string>('DB_NAME'),
        entities: [RouteData], // Register RouteData entity here
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true, // Set to true only for development
      }),
    }),
    TypeOrmModule.forFeature([RouteData]),
    TripdataModule,
  ],
  controllers: [AppController, TripdataController],
  providers: [AppService, SeedService, TripdataService],
})
export class AppModule {}
