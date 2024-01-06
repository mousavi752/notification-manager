export enum ProviderKey {
  KAVENEGAR = 'KAVENEGAR',
  GMAIL = 'GMAIL',
}

export type TEmailAdaptorSendInput = {
  sender: string;
  receiver: string;
  subject: string;
  message: string;
};

export interface IEmailAdaptor {
  send(args: TEmailAdaptorSendInput): void;
}

export interface ISmsAdaptor {
  sendTextual(args: TSendSmsInput): Promise<TSmsProviderOutput>;

  sendPattern(args: TSendSmsByTemplateInput): Promise<TSmsProviderOutput>;
}

export type TSendSmsInput = {
  receiver: string;
  message: string;
};

export type TSendSmsByTemplateInput = {
  token: string;
  token2?: string;
  token3?: string;
  receiver: string;
  template: string;
};

export type TSmsProviderOutput = {
  return: { status: number; message: string };
  entries: Array<{
    messageid: number;
    message: string;
    status: number;
    statustext: string;
    sender: string;
    receptor: string;
    date: number;
    cost: number;
  }>;
};

export type TSmsProviderServiceSendSmsInput = {
  receiver: string;
  message: string;
  providerDetails: any;
  smsProvider: ISmsAdaptor;
};

export type TSmsProviderServiceSendSmsByTemplateInput = {
  receiver: string;
  message: string;
  providerDetails: any;
  template: string;
  smsProvider: ISmsAdaptor;
};

export type TSmsProviderServiceSelectSmsProvider = { key: string };
export type TSmsProviderServiceSelectProvider = { template: string };

export type TSmsProviderServiceSendInput = {
  message: string;
  template: string;
  receiver: string;
  notificationId: number;
};
