import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { QueueName, TEmailTask, TSmsTask } from '../queue-manager.type';
import { Job } from 'bullmq';
import { EmailService } from '../../email/services/email.service';

@Injectable()
@Processor(QueueName.EMAIL)
export class EmailProcessor extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }
  async process(
    job: Job<TEmailTask, any, string>,
    token?: string
  ): Promise<any> {
    console.log('task is running');

    await this.emailService.send(job.data);
  }
}
