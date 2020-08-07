import { Logger } from '@iinfinity/logger';
import { existsSync, mkdirSync } from 'fs';

function getLogFilePath() {
  existsSync('log') || mkdirSync('log');
  return 'log/mock-weibo-api.log';
}

export const logger = new Logger({
  name: 'mock-weibo-api',
  stderr: process.stderr,
  stdout: process.stdout,
  fileerr: getLogFilePath(),
  fileout: getLogFilePath()
});
