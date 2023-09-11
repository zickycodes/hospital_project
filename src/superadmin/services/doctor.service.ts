import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Doctor } from 'src/entities/Doctors';
import { Doctordto } from '../dto/doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { retry } from 'rxjs';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor)
    private doctor: typeof Doctor,
  ) {}
  async addDoctors(doctor: Doctordto) {
    const password = doctor.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await this.doctor.create({
      ...doctor,
      password: hashedPassword,
    });
    return {
      message: 'Doctor created successfully',
      status: 200,
      res: {
        id: res.id,
        email: res.email,
      },
    };
  }
}
