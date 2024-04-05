import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transporter } from 'src/schemas/transporter.schema';

@Injectable()
export class TransportersService implements OnModuleInit {
  constructor(
    @InjectModel(Transporter.name) private transporterModel: Model<Transporter>,
  ) {}

  onModuleInit() {
    this.transporterModel.create({
      fullName: 'transporter1',
      address: 'test address 123',
    });
  }

  async findById(transporterId: string): Promise<Transporter | null> {
    return this.transporterModel.findOne({ _id: transporterId });
  }
}
