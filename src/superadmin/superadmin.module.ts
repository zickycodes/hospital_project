import { Module } from '@nestjs/common';
import { SuperAdminController } from './controller/admin.controller';
import { DoctorService } from './services/doctor.service';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from 'src/entities/Doctors';
import { HospitalService } from './services/hospital.service';
import { Hospital } from 'src/entities/Hospital';
@Module({
  imports: [SequelizeModule.forFeature([Doctor, Hospital])],
  controllers: [SuperAdminController],
  providers: [DoctorService, JwtService, HospitalService],
})
export class SuperAdminModule {}
