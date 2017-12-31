import { Record } from 'immutable';

export default class Team extends Record({
  key: undefined,
  team_number: undefined,
  nickname: undefined,
  city: undefined,
  state_prov: undefined,
  country: undefined,
}) {
  getCityStateCountry() {
    return `${this.city}, ${this.state_prov}, ${this.country}`
  }
}
