import { LoggerServiceFactory } from './common/logger/loggerServiceFactory.js';
import { createConfig } from './config.js';
import { HttpServer } from './httpServer.js';

export class Application {
  public readonly server: HttpServer;

  public constructor() {
    const config = createConfig();

    const loggerService = LoggerServiceFactory.create({ logLevel: config.logLevel });

    this.server = new HttpServer(loggerService, config);
  }

  public async start(): Promise<void> {
    await this.server.start();
  }

  public async stop(): Promise<void> {
    await this.server.stop();
  }
}
