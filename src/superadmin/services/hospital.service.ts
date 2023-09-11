import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hospital } from 'src/entities/Hospital';
// import { Doctor } from 'src/entities/Doctors';
import { Hospitaldto } from '../dto/hospital.dto';
import { InjectModel } from '@nestjs/sequelize';
// import { retry } from 'rxjs';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel(Hospital)
    private doctor: typeof Hospital,
  ) {}
  async addHospital(hospital: Hospitaldto) {
    const password = hospital.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await this.doctor.create({
      ...hospital,
      password: hashedPassword,
    });
    return {
      message: 'Hospital created successfully',
      status: 200,
      res: {
        id: res.id,
        email: res.email,
      },
    };
  }
}
