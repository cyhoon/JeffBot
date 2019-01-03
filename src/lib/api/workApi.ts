import { axiosInstance } from './index';

const sendWorkHistoryTime = (workType: string) => {
  try {
    axiosInstance.post('/api/work/history', { workType });
  } catch (error) {
    throw new Error('API 오류');
  }
};

export { sendWorkHistoryTime };
