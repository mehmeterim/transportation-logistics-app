import { Module } from '@nestjs/common';
import { TransportersService } from './transporters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transporter, TransporterSchema } from 'src/schemas/transporter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transporter.name, schema: TransporterSchema },
    ]),
  ],
  providers: [TransportersService],
  exports: [TransportersService],
})
export class TransportersModule {}
