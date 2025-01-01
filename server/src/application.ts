import mongoose from 'mongoose';

import { LoggerServiceFactory } from './common/logger/loggerServiceFactory.js';
import { type Config, createConfig } from './config.js';
import { HttpServer } from './httpServer.js';

export class Application {
  public readonly config: Config;
  public readonly server: HttpServer;

  public constructor() {
    this.config = createConfig();

    const loggerService = LoggerServiceFactory.create({ logLevel: this.config.logLevel });

    this.server = new HttpServer(loggerService, this.config);
  }

  public async start(): Promise<void> {
    await mongoose.connect(this.config.mongo.uri);

    await this.server.start();
  }

  public async stop(): Promise<void> {
    await mongoose.disconnect();

    await this.server.stop();
  }
}
