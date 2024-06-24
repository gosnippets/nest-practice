import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as pino from 'pino';

@Injectable()
export class CustomLogger extends Logger {
  private readonly logger: pino.Logger;

  constructor() {
    super();
    this.logger = pino({
      prettyPrint: true,
    });
  }

  log(message: any, ...optionalParams: any[]) {
    const maskedMessage = this.maskSensitiveData(message);
    this.logger.info(maskedMessage, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    const maskedMessage = this.maskSensitiveData(message);
    this.logger.error(maskedMessage, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    const maskedMessage = this.maskSensitiveData(message);
    this.logger.warn(maskedMessage, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    const maskedMessage = this.maskSensitiveData(message);
    this.logger.debug(maskedMessage, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    const maskedMessage = this.maskSensitiveData(message);
    this.logger.trace(maskedMessage, ...optionalParams);
  }

  private maskSensitiveData(data: any): any {
    const mask = (str: string) => str.replace(/(.{2}).+(.{2}@.+)/, '$1****$2').replace(/(.{3}).+(.{2})/, '$1****$2');

    if (typeof data === 'object' && data !== null) {
      const maskedData = Array.isArray(data) ? [] : {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === 'email' || key === 'contact') {
            maskedData[key] = mask(data[key]);
          } else if (typeof data[key] === 'object' && data[key] !== null) {
            maskedData[key] = this.maskSensitiveData(data[key]);
          } else {
            maskedData[key] = data[key];
          }
        }
      }
      return maskedData;
    }
    return data;
  }
}
