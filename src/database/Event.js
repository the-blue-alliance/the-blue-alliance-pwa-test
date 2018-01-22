import { Record } from 'immutable';

export default class Event extends Record({
  key: undefined,
  name: undefined,
  short_name: undefined,
  year: undefined,
  start_date: undefined,
}) {

}
