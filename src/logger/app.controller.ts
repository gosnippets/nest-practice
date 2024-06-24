import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomLogger } from './custom-logger.service';

@Controller()
export class AppController {
  constructor(private readonly logger: CustomLogger) {}

  @Post('log-test')
  logTest(@Body() body: any, @Res() res: Response) {
    const response = { message: 'Data received', data: body };

    this.logger.log({
      message: 'Sending response',
      response: this.logger['maskSensitiveData'](response),
    });

    res.status(201).json(response);
  }
}
