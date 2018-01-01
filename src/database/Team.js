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
    let s = ''
    if (this.city) {
        s += `${this.city}`
    }
    if (this.state_prov) {
        s += `, ${this.state_prov}`
    }
    if (this.country) {
        s += `, ${this.country}`
    }
    if (s == '') {
        return null
    }
    return s
  }
}
