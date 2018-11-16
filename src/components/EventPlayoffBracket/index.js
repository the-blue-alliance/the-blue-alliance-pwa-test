// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components

// TBA Components
import BracketContext from './BracketContext'
import PlayoffMatchup from './PlayoffMatchup'
import PlayoffFinalsMatchup from './PlayoffFinalsMatchup'

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit,
  },
  round: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    maxWidth: 100,
  },
})

class EventPlayoffBracket extends React.PureComponent {
  state = {
    selectedSeed: null,
    setSelectedSeed: seed => {
      this.setState({selectedSeed: seed})
    },
    allianceTeamKeys: null,
    winStats: null,
  }

  updateAlliances = () => {
    const { alliances, matches, playoffType } = this.props

    let allianceTeamKeys = null
    const teamAllianceMap = {}
    if (alliances) {
      allianceTeamKeys = {}
      alliances.forEach((a, i) => {
        allianceTeamKeys[i] = a.get('picks')
        // Add in backup if it exists
        const backup = a.getIn(['backup', 'in'])
        if (backup) {
          allianceTeamKeys[i] = allianceTeamKeys[i].push(backup)
        }
        // Add to team-alliance map
        allianceTeamKeys[i].forEach(teamKey => {
          teamAllianceMap[teamKey] = i
        })
      })
    }

    let winStats = null
    if (matches) {
      winStats = {}
      matches.forEach(m => {
        if (!winStats[m.comp_level]) {
          winStats[m.comp_level] = {}
        }
        if (!winStats[m.comp_level][m.set_number]) {
          winStats[m.comp_level][m.set_number] = {
            redAllianceId: teamAllianceMap[m.getIn(['alliances', 'red', 'team_keys', 0])],
            blueAllianceId: teamAllianceMap[m.getIn(['alliances', 'blue', 'team_keys', 0])],
            redWins: 0,
            blueWins: 0,
            winner: null,
          }
        }
        if (m.winning_alliance === 'red') {
          winStats[m.comp_level][m.set_number].redWins += 1
        }
        if (m.winning_alliance === 'blue') {
          winStats[m.comp_level][m.set_number].blueWins += 1
        }

        const numToWin = playoffType === 6 ? 3 : 2
        if (winStats[m.comp_level][m.set_number].redWins == numToWin) {
          winStats[m.comp_level][m.set_number].winner = 'red'
        }
        if (winStats[m.comp_level][m.set_number].blueWins == numToWin) {
          winStats[m.comp_level][m.set_number].winner = 'blue'
        }
      })
    }

    this.setState({
      allianceTeamKeys,
      winStats,
    })
  }

  componentDidMount() {
    this.updateAlliances()
  }

  componentDidUpdate(prevProps) {
    const { alliances: prevAlliances, matches: prevMatches } = prevProps
    const { alliances, matches } = this.props
    if (prevAlliances !== alliances || prevMatches !== matches) {
      this.updateAlliances()
    }
  }

  render() {
    console.log("Render EventPlayoffBracket")

    const { classes, eventKey, playoffType } = this.props
    const { winStats } = this.state

    let hasQf = true
    let hasSf = true
    if (playoffType === 4) {
      hasQf = false
      hasSf = false
    }

    return (
      <BracketContext.Provider value={this.state}>
        <div className={classes.container}>
          {winStats && winStats.qf && hasQf && <div className={classes.round}>
            <PlayoffMatchup
              eventKey={eventKey}
              compLevel='qf'
              setNumber={1}
              winner='red'
            />
            <PlayoffMatchup
              eventKey={eventKey}
              compLevel='qf'
              setNumber={2}
              winner='red'
            />
          </div>}
          {winStats && winStats.sf && hasSf && <div className={classes.round}>
            <PlayoffMatchup
              eventKey={eventKey}
              compLevel='sf'
              setNumber={1}
              winner='red'
            />
          </div>}
          <div className={classes.round}>
            <PlayoffFinalsMatchup
              eventKey={eventKey}
              winner='blue'
            />
          </div>
          {winStats && winStats.sf && hasSf && <div className={classes.round}>
            <PlayoffMatchup
              eventKey={eventKey}
              compLevel='sf'
              setNumber={2}
              winner='blue'
              rightSide
            />
          </div>}
          {winStats && winStats.qf && hasQf && <div className={classes.round}>
            <PlayoffMatchup
              eventKey={eventKey}
              compLevel='qf'
              setNumber={3}
              winner='red'
              rightSide
            />
            <PlayoffMatchup
              eventKey={eventKey}
              compLevel='qf'
              setNumber={4}
              winner='red'
              rightSide
            />
          </div>}
        </div>
      </BracketContext.Provider>
    )
  }
}

export default withStyles(styles)(EventPlayoffBracket)
