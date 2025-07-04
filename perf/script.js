import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
};

export default function() {
  let res = http.get('https://owl-writey.hemit.fr/api/ping');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
