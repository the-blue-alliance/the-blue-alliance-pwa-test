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
db.version(7).stores({
  teamEventStatus: '&key, teamKey_year, eventKey',
})
db.version(8).stores({
  userFavorites: '&key, model_key, model_type',
})
db.version(9).stores({
  apiCalls: '&url',
})
db.version(10).stores({  // Rename table
  teamEventStatuses: '&key, teamKey_year, eventKey',
}).upgrade(function (t) {
  t.teamEventStatus.clear()
})
db.version(11).stores({
  media: '&key',
  mediaTeams: '&key, mediaKey, teamKey, teamKey_year',
})
db.version(12).stores({
  eventRankings: '&key',
  eventAlliances: '&key',
})
db.version(13).stores({
  config: '&key',
})

export default db;

// Write helpers
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

export const addEventRankings = (rankings) => db.eventRankings.put(rankings)

export const addEventAlliances = (alliances) => db.eventAlliances.put(alliances)

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

export const addTeamEventStatuses = (statuses) => {
  db.teamEventStatuses.bulkPut(statuses)
}

export const addMedias = (medias) => db.media.bulkPut(medias)

export const addTeamMedias = (teamKey, medias, year) => {
  addMedias(medias)
  db.mediaTeams.bulkPut(medias.map(media => {
    return {
      key: `${media.key}_${teamKey}`,
      mediaKey: media.key,
      teamKey: teamKey,
      teamKey_year: `${teamKey}_${year}`,
    }
  }))
}

export const addUserFavorites = (favorites) => {
  db.userFavorites.bulkPut(favorites)
}

export const clearUserData = () => {
  db.userFavorites.clear()
}

// Data transformers
export const augmentAward = (award) => {
  var newAward = Object.assign({}, award)
  newAward.key = `${award.event_key}_${award.award_type}`
  return newAward
}

export const augmentTeamEventStatus = (
  status,
  teamKey,
  eventKey,
  year,
) => {
  var newStatus = Object.assign({}, status)
  newStatus.key = `${eventKey}_${teamKey}`
  newStatus.eventKey = eventKey
  newStatus.teamKey = teamKey
  newStatus.year = year
  newStatus.teamKey_year = `${teamKey}_${year}`
  return newStatus
}

export const augmentMedia = (
  media,
) => {
  var newMedia = Object.assign({}, media)
  newMedia.key = `${media.type}_${media.foreign_key}`
  return newMedia
}
