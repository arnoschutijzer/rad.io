import { LOGIN } from '../actions/auth';
import { BASE } from '../../config/config';

export const login = (email, password) => ({
  type: LOGIN,
  api: {
    url: BASE + '/login',
    method: 'POST',
    data: {
      email,
      password
    }
  }
});
