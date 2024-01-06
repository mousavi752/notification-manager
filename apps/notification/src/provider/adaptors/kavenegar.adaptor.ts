import {
  ISmsAdaptor,
  TSendSmsByTemplateInput,
  TSendSmsInput,
  TSmsProviderOutput,
} from '../provider.type';
import axios from 'axios';

export class KavenegarAdaptor implements ISmsAdaptor {
  constructor(
    private readonly apiKey: string,
    private readonly sender: string
  ) {}

  async sendTextual(args: TSendSmsInput): Promise<TSmsProviderOutput> {
    const endPoint = `https://api.kavenegar.com/v1/${this.apiKey}/sms/send.json`;
    const params = {
      receptor: args.receiver,
      message: args.message,
      sender: this.sender,
    };

    const response: TSmsProviderOutput = (
      await axios.get(endPoint, { params: params })
    ).data;

    return response;
  }

  async sendPattern(
    args: TSendSmsByTemplateInput
  ): Promise<TSmsProviderOutput> {
    const endPoint = `https://api.kavenegar.com/v1/${this.apiKey}/verify/lookup.json`;
    const params = {
      receptor: args.receiver,
      token: args.token,
      token2: args.token2,
      token3: args.token3,
      template: args.template,
    };

    const response: TSmsProviderOutput = (
      await axios.get(endPoint, { params: params })
    ).data;

    return response;
  }
}
