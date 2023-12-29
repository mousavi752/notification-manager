import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { QueueName, TSmsTask } from '../queue-manager.type';
import { Job } from 'bullmq';
import { SmsService } from '../../sms/services/sms.service';

@Injectable()
@Processor(QueueName.SMS)
export class SmsProcessor extends WorkerHost {
  constructor(private readonly smsService: SmsService) {
    super();
  }
  async process(job: Job<TSmsTask, any, string>, token?: string): Promise<any> {
    await this.smsService.send(job.data);
  }
}
