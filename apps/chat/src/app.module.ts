import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageDocument } from './schemas/message.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { join } from 'path';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chat'),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'notification',
          protoPath: join(__dirname, '../../../proto/notification.proto'),
          url: 'localhost:50054',
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
