import { BASE } from '../../config/config';
import {
  FETCH_SYSTEM_STATUS
} from '../actions/system';

export const fetchSystemStatus = () => ({
  type: FETCH_SYSTEM_STATUS,
  api: {
    url: `${BASE}/status`,
    method: 'GET',
    // don't cache it
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  }
});
