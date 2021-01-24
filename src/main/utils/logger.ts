import { Logger, Level } from '@iinfinity/logger';
import { existsSync, mkdirSync } from 'fs';

function getLogFilePath() {
  existsSync('log') || mkdirSync('log');
  return 'log/weibo-api.log';
}

export const logger = new Logger({
  name: 'weibo-api',
  level: process.env['MODE'] === 'DEV' ? Level.DEBUG : Level.INFO,
  stderr: process.stderr,
  stdout: process.stdout,
  fileerr: getLogFilePath(),
  fileout: getLogFilePath()
});
