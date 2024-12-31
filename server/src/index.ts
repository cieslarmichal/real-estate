import { Application } from './application.js';
import { serializeError } from './common/errors/serializeError.js';

export const finalErrorHandler = async (error: unknown): Promise<void> => {
  const serializedError = serializeError(error);

  console.error({
    message: 'Application error.',
    context: JSON.stringify(serializedError),
  });

  await application?.stop();

  process.exit(1);
};

process.on('unhandledRejection', finalErrorHandler);

process.on('uncaughtException', finalErrorHandler);

process.on('SIGINT', finalErrorHandler);

process.on('SIGTERM', finalErrorHandler);

let application: Application | undefined;

try {
  application = new Application();

  await application.start();
} catch (error) {
  await finalErrorHandler(error);
}
