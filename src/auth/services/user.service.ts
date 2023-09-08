import { Injectable } from '@nestjs/common';
import { SuperAdmin } from 'src/entities/SuperAdmin';
import { Doctor } from 'src/entities/Doctors';
import { InjectModel } from '@nestjs/sequelize';
import { Operator } from 'src/entities/Operators';
import { Hospital } from 'src/entities/Hospital';
import { SignUpDto } from '../dto/signupdto';
import * as bcrypt from 'bcrypt';
// import { User } from 'src/entities/User';

@Injectable()
export class Userservice {
  constructor(
    @InjectModel(SuperAdmin)
    private superAdminModel: typeof SuperAdmin,
    @InjectModel(Doctor)
    private doctor: typeof Doctor,
    @InjectModel(Operator)
    private operator: typeof Operator,
    @InjectModel(Hospital)
    private hospitaladmin: typeof Hospital,
  ) {}
  // async createUser(userDetails: SignUpDto) {
  //   const password = userDetails.password;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const res = await this.userModel.create({
  //     ...userDetails,
  //     password: hashedPassword,
  //   });
  //   return res;
  // }
  async findOne(userdetail: any, identity: string): Promise<any> {
    // console.log(userdetail);
    // console.log(identity);
    // return await this.userModel.sequelize.query(
    //   'SELECT * FROM "Users" WHERE email = ?',
    //   {
    //     replacements: [email],
    //     type: QueryTypes.SELECT,
    //   },
    // );
    if (identity === 'admin') {
      console.log('ksh');
      return await this.superAdminModel.findOne({
        where: {
          email: userdetail.email,
          // password: userdetail.password,
        },
      });
    }

    if (identity === 'hospitaladmin') {
      return await this.hospitaladmin.findOne({
        where: {
          email: userdetail.email,
          password: userdetail.password,
        },
      });
    }

    if (identity === 'operator') {
      return await this.operator.findOne({
        where: {
          email: userdetail.email,
          password: userdetail.password,
        },
      });
    }

    if (identity === 'doctor') {
      return await this.doctor.findOne({
        where: {
          email: userdetail.email,
          password: userdetail.password,
        },
      });
    }
  }

  async createUser(userDetails: SignUpDto, identity: string) {
    const password = userDetails.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (identity === 'admin') {
      console.log('ksh');

      const res = await this.superAdminModel.create({
        ...userDetails,
        password: hashedPassword,
      });
      return res;
    }
  }
  // async findOneAndUpdate(
  //   useridentifier: number | string,
  //   userdetails: any,
  // ): Promise<any> {
  //   // console.log(id);
  //   // console.log(userdetails);
  //   // console.log('useridentifier', useridentifier);
  //   const password = userdetails.password ? userdetails.password : null;
  //   let hashedPassword;
  //   if (password) {
  //     hashedPassword = await bcrypt.hash(password, 10);
  //     return await this.userModel.update(
  //       {
  //         ...userdetails,
  //         password: hashedPassword,
  //       },
  //       { where: { id: useridentifier } },
  //     );
  //   } else {
  //     return await this.userModel.update(
  //       {
  //         ...userdetails,
  //       },
  //       { where: { id: useridentifier } },
  //     );
  //   }
  // }
}
