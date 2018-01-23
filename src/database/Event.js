import { Record } from 'immutable';

const REGIONAL = 0
const DISTRICT = 1
const DISTRICT_CMP = 2
const CMP_DIVISION = 3
const CMP_FINALS = 4
const DISTRICT_CMP_DIVISION = 5
const FOC = 6
// const OFFSEASON = 99
const PRESEASON = 100

const CMP_TPYES = new Set([
  CMP_DIVISION,
  CMP_FINALS,
])

const OFFICIAL_TYPES = new Set([
  REGIONAL,
  DISTRICT,
  DISTRICT_CMP_DIVISION,
  DISTRICT_CMP,
  CMP_DIVISION,
  CMP_FINALS,
  FOC,
])

export default class Event extends Record({
  key: undefined,
  name: undefined,
  short_name: undefined,
  year: undefined,
  week: undefined,
  event_type: undefined,
  district: undefined,
  start_date: undefined,
  end_date: undefined,
  city: undefined,
  state_prov: undefined,
  country: undefined,
}) {
  getCityStateCountry() {
    if (this.cityStateCountry === undefined) {
      this.cityStateCountry = ''
      if (this.city) {
          this.cityStateCountry += `${this.city}`
      }
      if (this.state_prov) {
          this.cityStateCountry += `, ${this.state_prov}`
      }
      if (this.country) {
          this.cityStateCountry += `, ${this.country}`
      }
      if (this.cityStateCountry === '') {
          this.cityStateCountry = null
      }
    }
    return this.cityStateCountry
  }

  isCMP() {
    return CMP_TPYES.has(this.event_type)
  }

  isFOC() {
    return this.event_type === FOC
  }

  isPreseason() {
    return this.event_type === PRESEASON
  }

  isOfficial() {
    return OFFICIAL_TYPES.has(this.event_type)
  }

  isRegional() {
    return this.event_type === REGIONAL
  }
}
