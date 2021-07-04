import { DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './access';
import { AphorismModule } from './aphorism';
import { CommentModule } from './comment';
import { AccessHandler } from './common/handlers';
import { StatusModule } from './status';
import { UserModule } from './user';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS],
  modules: [AccessModule, AphorismModule, UserModule, CommentModule, StatusModule],
});

rester.bootstrap();
