export const getPaginatedTeams = (database) => {
  if (database.teamList.length !== 0) {
    return database.teamList
  } else {
    return 'NONE'
  }
}
