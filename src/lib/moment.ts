import * as moment from 'moment-timezone';

const seoul = (momentInput?: number | moment.Moment): moment.Moment => {
  if (!momentInput) {
    return moment().tz('Asia/Seoul');
  }

  return moment(momentInput).tz('Asia/Seoul');
};

export {
  seoul,
};

