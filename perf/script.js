import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 15 },
    { duration: '20s', target: 0 },
  ],
};

const credentials = {
  email: __ENV.EMAIL,
  password: __ENV.PASSWORD,
  returnSecureToken: true,
};

// L'authentification est appelée qu'une seule fois pour éviter de spammer l'API
function authenticate() {
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${__ENV.API_KEY}`;
  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(url, JSON.stringify(credentials), { headers });

  // console.log('[AUTH] status:', res.status);
  // console.log('[AUTH] body:', res.body);

  check(res, {
    'auth success': (r) => r.status === 200 && r.json('idToken') !== undefined,
  });

  return res.json('idToken');
}

// setup() est exécuté une fois avant tous les VUs pour récupérer le token d'authentification
export function setup() {
  const token = authenticate();
  return { token };
}

// Chaque VU accède au token via le paramètre `data` évitant ainsi de le redemander à chaque itération
export default function (data) {
  const token = data.token;

  if (!token) {
    console.error('[ERROR] Token is undefined, skipping request.');
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const res = http.get('https://owl-writey.hemit.fr/api/exercises', { headers });

  // console.log('[EXO] status:', res.status);
  // console.log('[EXO] body:', res.body);

  check(res, {
    'exercises loaded': (r) => r.status === 200,
    'has at least one exercise': (r) =>
      Array.isArray(r.json('exercises')) && r.json('exercises').length >= 1,
  });

  sleep(1);
}
