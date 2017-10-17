import { Record } from 'immutable';

const COMP_LEVELS = {
  'qm': 'Quals',
  'ef': 'Octos',
  'qf': 'Quarters',
  'sf': 'Semis',
  'f': 'Finals',
}
const PLAY_ORDER = {
  qm: 1,
  ef: 2,
  qf: 3,
  sf: 4,
  f: 5,
}

export default class Match extends Record({
  key: undefined,
  comp_level: undefined,
  set_number: undefined,
  match_number: undefined,
  alliances: undefined,
  winning_alliance: undefined,
  score_breakdown: undefined,
}) {
  getDisplayName() {
    if (this.comp_level === 'qm' || this.comp_level === 'f') {
      return `${COMP_LEVELS[this.comp_level]} ${this.match_number}`
    } else {
      return `${COMP_LEVELS[this.comp_level]} ${this.set_number} Match ${this.match_number}`
    }
  }

  getNaturalOrder() {
    return PLAY_ORDER[this.comp_level]*100000 + this.set_number*100 + this.match_number
  }

  getPlayOrder() {
    return PLAY_ORDER[this.comp_level]*100000 + this.match_number*100 + this.set_number
  }

}
