import { injectable } from 'inversify';
import { IMailProvider, Mail } from './IMailProvider';

@injectable()
export class ConsoleMailProvider implements IMailProvider {
  async sendMail(mail: Mail): Promise<string | null> {
    console.log('--- [ConsoleMailProvider] E-mail simulado ---');
    console.log(`Para: ${mail.to}`);
    console.log(`Assunto: ${mail.subject}`);
    console.log(`Mensagem: ${mail.text}`);
    console.log('---------------------------------------------');
    return null;
  }
}

