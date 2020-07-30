import { HOME_TIMELINE } from '../main/weibo/data/home-timeline';
import { PUBLIC_TIMELINE } from '../main/weibo/data/public-timeline';
import { writeFileSync } from 'fs';

const statuses = HOME_TIMELINE.map(v => v.statuses)
  .concat(
    PUBLIC_TIMELINE.statuses as any
  );

writeFileSync('dist/status.json', JSON.stringify(statuses));
