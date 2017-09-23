import Dexie from 'dexie';

var db = new Dexie('TBA-Models-v3');
db.version(1).stores({
  events: '&key, year',
  eventTeams: '&key, eventKey, teamKey, teamKey_year',
  // matchTeams: '&key, matchKey',
  teams: '&key, team_number',
})
db.version(2).stores({
  matches: '&key, event_key',
})
export default db;

// Write helpers. TODO: needs to handle deletion
export const addEvent = (event) => db.events.put(event)

export const addEvents = (events) => db.events.bulkPut(events)

export const addEventTeams = (eventKey, teams) => {
  addTeams(teams)
  db.eventTeams.bulkPut(teams.map(team => {
    return {
      key: `${eventKey}_${team.key}`,
      eventKey: eventKey,
      teamKey: team.key,
      teamKey_year: `${team.key}_${parseInt(eventKey.substring(0, 4), 10)}`,
    }
  }))
}

export const addMatches = (matches) => db.matches.bulkPut(matches)

export const addTeam = (team) => db.teams.put(team)

export const addTeams = (teams) => db.teams.bulkPut(teams)

export const addTeamEvents = (teamKey, events) => {
  addEvents(events)
  db.eventTeams.bulkPut(events.map(event => {
    return {
      key: `${event.key}_${teamKey}`,
      eventKey: event.key,
      teamKey: teamKey,
      teamKey_year: `${teamKey}_${event.year}`,
    }
  }))
}
