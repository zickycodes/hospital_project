import {
  Body,
  Controller,
  Post,
  // Put,
  // UseGuards,
  //   UsePipes,
  //   ValidationPipe,
  //   Get,
  //   Param,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/services/auth.guard';
import { Doctordto } from '../dto/doctor.dto';
import { Hospitaldto } from '../dto/hospital.dto';
import { DoctorService } from '../services/doctor.service';
import { HospitalService } from '../services/hospital.service';

@Controller('/superadmin')
export class SuperAdminController {
  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('/add-doctors')
  @UsePipes(new ValidationPipe())
  addDoctors(@Body() body: Doctordto) {
    // console.log(body);
    return this.doctorService.addDoctors(body);
  }

  @UseGuards(AuthGuard)
  @Post('/add-hospital')
  @UsePipes(new ValidationPipe())
  addHospital(@Body() body: Hospitaldto) {
    // console.log(body);
    return this.hospitalService.addHospital(body);
  }
}
