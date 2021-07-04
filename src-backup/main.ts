import { CORSHandler, ExceptionHandler, LoggerHandler, ParameterHandler, Rester, RouterHandler, SchemaHandler } from '@rester/core';
import { AccessEntity } from './access';
import { CommentEntity } from './comment';
import { AccessHandler } from './common/handlers';
import { ManageEntity } from './manage';
import { StatusEntity } from './status';
import { UserEntity } from './user';
import { WeiboEntity } from './weibo';

const rester = new Rester();

rester.addEntities(
  AccessEntity,
  CommentEntity,
  ManageEntity,
  StatusEntity,
  UserEntity,
  WeiboEntity,
);

rester.addHandlers(
  AccessHandler,
  ExceptionHandler,
  SchemaHandler,
  RouterHandler,
  ParameterHandler,
  LoggerHandler,
  CORSHandler,
);

rester.bootstrap();
