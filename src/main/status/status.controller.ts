import { logger } from '@iinfinity/logger';
import { Controller } from '@rester/core';
import { get, put } from 'superagent';
import { Result, insertOneByOne } from '../util';
import { StatusEntity } from './status.entity';
import { Status } from './status.model';

// insert, delete, update, select
// one, more

@Controller()
export class StatusController {

}
