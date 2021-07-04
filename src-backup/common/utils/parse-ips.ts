import { IncomingMessage } from 'http';

export const parseIPs = (...input: (string[] | string | undefined)[]): string[] => {

  const ips = input.map(item => {
    if (Array.isArray(item)) {
      return item;
    }
    if (typeof item === 'string') {
      return item.split(',').map(ip => ip.trim());
    }
    return [];
  }).flat();

  return [...new Set(ips)];

};

export const parseIPsFromRequest = (request: IncomingMessage) => {
  return parseIPs(
    request.headers['x-real-ip'],
    request.headers['x-forwarded-for'],
    request.socket.remoteAddress,
  );
};
