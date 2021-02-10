import http from 'k6/http';
import { sleep } from 'k6';

const form = {
  form: {
    description: 'This is a test',
    isOpen: true,
    suggestedDuration: 133,
    address: '1313 Mockingbird Lane'
  }
}

// GET by ID
export default function () {
  http.get(`http://localhost:3001/api/showcase/${Math.floor(Math.random() * 10000000)}`);
  sleep(1);
}

// POST by ID
// export default function () {
//   http.post(`http://localhost:3001/api/showcase/${Math.floor(Math.random() * 10000000)}`);
//   sleep(1);
// }