import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'notification',
    protoPath: join(__dirname, '../../../proto/notification.proto'),
    url: 'localhost:50054',
  },
};
