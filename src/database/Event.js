import { Record } from 'immutable'
import moment from 'moment-timezone'

export const REGIONAL = 0
export const DISTRICT = 1
export const DISTRICT_CMP = 2
export const CMP_DIVISION = 3
export const CMP_FINALS = 4
export const DISTRICT_CMP_DIVISION = 5
export const FOC = 6
export const OFFSEASON = 99
export const PRESEASON = 100

const CMP_TYPES = new Set([
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
  event_code: undefined,
  week: undefined,
  event_type: undefined,
  district: undefined,
  start_date: undefined,
  end_date: undefined,
  timezone: undefined,
  city: undefined,
  state_prov: undefined,
  country: undefined,
}) {
  safeShortName() {
    return this.short_name ? this.short_name : this.name
  }

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

  getCityStateCountryLower() {
    if (this.cityStateCountryLower === undefined) {
      if (this.getCityStateCountry()) {
        this.cityStateCountryLower = this.getCityStateCountry().toLowerCase()
      } else {
        this.cityStateCountryLower = null
      }
    }
    return this.cityStateCountryLower
  }

  getDateString() {
    if (this.dateStr === undefined) {
      const startDate = new Date(this.start_date)
      const endDate = new Date(this.end_date)
      this.dateStr = endDate.toLocaleString('en-us', {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      if (startDate.getTime() !== endDate.getTime()) {
        const startDateStr = startDate.toLocaleString('en-us', {
          timeZone: 'UTC',
          day: 'numeric',
          month: 'short',
        })
        this.dateStr = `${startDateStr} to ${this.dateStr}`
      }
    }
    return this.dateStr
  }

  isPast() {
    return moment.tz(this.end_date, this.timezone).add(1, 'days') < moment.now()
  }

  isFuture() {
    return moment.tz(this.start_date, this.timezone) > moment.now()
  }

  isNow() {
    return !this.isPast() && !this.isFuture()
  }

  isCMP() {
    return CMP_TYPES.has(this.event_type)
  }

  isDistrictQual() {
    return this.event_type === DISTRICT
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
