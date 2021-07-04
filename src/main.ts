import { DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './access';
import { AphorismModule } from './aphorism';
import { AccessHandler } from './common/handlers';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS],
  modules: [AccessModule, AphorismModule],
});

rester.bootstrap();
