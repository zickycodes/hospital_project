import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Operator } from 'src/entities/Operators';
import { OperatorDto } from '../dto/operatordto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HospitalAdminService {
  constructor(
    @InjectModel(Operator)
    private operator: typeof Operator,
  ) {}
  async showOperators() {
    try {
      const operator = await this.operator.findAll();
      const operatorData = operator.map((operator) => ({
        id: operator.id,
        first_name: operator.first_name,
        email: operator.email,
      }));
      return operatorData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async showOperator(id: string) {
    try {
      return await this.operator.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addOperators(operator: OperatorDto) {
    try {
      const password = operator.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.operator.create({
        ...operator,
        password: hashedPassword,
      });
      return {
        message: 'Operator created successfully',
        status: 200,
        res: {
          id: res.id,
          email: res.email,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async editOperators(id: string, body: OperatorDto) {
    return await this.operator.update({ ...body }, { where: { id } });
  }

  async deleteOperator(id: number) {
    return await this.operator.destroy({ where: { id } });
  }
}
