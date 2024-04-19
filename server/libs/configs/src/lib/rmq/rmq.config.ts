import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const RMQConfig = (): IRMQServiceAsyncOptions => ({
	inject: [ConfigService],
	imports: [ConfigModule],
	useFactory: (service: ConfigService) => ({
		exchangeName: service.get('AMQP_EXCHANGE') ?? '',
		connections: [
			{
			  login: service.get('AMQP_USER') ?? '',
			  password: service.get('AMQP_PASSWORD') ?? '',
			  host: service.get('AMQP_HOSTNAME') ?? ''
			}
		],
		queueName: service.get('AMQP_QUEUE'),
		prefetchCount: 32,
		serviceName: 'mikolyants-api'
	})
})