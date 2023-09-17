import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [],
  providers: [JwtService],
})
export class HospitalAdminModule {}
