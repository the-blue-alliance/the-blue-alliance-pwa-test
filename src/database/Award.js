import { Record } from 'immutable';

export default class Award extends Record({
  key: undefined,
  award_type: undefined,
  event_key: undefined,
  name: undefined,
  recipient_list: undefined,
}) {

}
