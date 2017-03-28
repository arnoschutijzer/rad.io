import { LOGIN } from '../constants/auth';
import { BASE } from '../../config/config';

export const login = (email, password) => ({
  type: LOGIN,
  api: {
    url: BASE + '/login'
  },
  options: {
    method: 'POST',
    data: {
      email,
      password
    }
  }
});
