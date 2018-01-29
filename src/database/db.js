import Dexie from 'dexie';

var db = new Dexie('TBA-Models-v3');
db.version(1).stores({
  events: '&key, year',
  eventTeams: '&key, eventKey, teamKey, teamKey_year',
  teams: '&key, team_number',
})
db.version(2).stores({
  matches: '&key, event_key',
})
db.version(3).stores({
  matchTeams: '&key, matchKey, teamKey, teamKey_year, teamKey_eventKey',
})
db.version(4).stores({
  awards: '&key, event_key',
  awardTeams: '&key, awardKey, teamKey, teamKey_year, teamKey_eventKey',
})
db.version(5).stores({
  teamEventStatus: '&key',
})
db.version(6).stores({
  teamYears: '&key',
})

export default db;

// Write helpers. TODO: needs to handle deletion
export const addAwards = (awards) => {
  db.awards.bulkPut(awards)
  let awardTeams = []
  awards.forEach(award => {
    for (let recipient of award.recipient_list) {
      const teamKey = recipient.team_key
      if (teamKey) {
        awardTeams.push({
          key: `${award.key}_${teamKey}`,
          awardKey: award.key,
          teamKey: teamKey,
          teamKey_year: `${teamKey}_${award.year}`,
          teamKey_eventKey: `${teamKey}_${award.event_key}`,
        })
      }
    }
  })
  db.awardTeams.bulkPut(awardTeams)
}

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

export const addMatch = (match) => db.matches.put(match)

export const addMatches = (matches) => {
  db.matches.bulkPut(matches)
  let matchTeams = []
  matches.forEach(match => {
    for (var color in match.alliances) {
      match.alliances[color].team_keys.forEach(teamKey => {
        matchTeams.push({
          key: `${match.key}_${teamKey}`,
          matchKey: match.key,
          teamKey: teamKey,
          teamKey_year: `${teamKey}_${parseInt(match.event_key.substring(0, 4), 10)}`,
          teamKey_eventKey: `${teamKey}_${match.event_key}`,
        })
      })
    }
  })
  db.matchTeams.bulkPut(matchTeams)
}

export const addTeamYears = (teamYears) => db.teamYears.put(teamYears)

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

export const addTeamEventStatus = (teamKey, eventKey, status) => {
  if (status) {
    status['key'] = `${teamKey}_${eventKey}`
    db.teamEventStatus.put(status)
  }
}
