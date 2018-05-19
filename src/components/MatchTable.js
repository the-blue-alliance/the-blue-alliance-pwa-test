// General
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

// Components
import CircularProgress from '@material-ui/core/CircularProgress'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import { Link } from 'react-router-dom'

// TBA Components

const styles = theme => ({
  table: {
    padding: '5px 0',
    margin: 0,
    width: '100%',
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  key: {
    backgroundColor: '#f0f0f0',
  },
  tr: {
    padding: '5px 0',
  },
  th: {
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle !important',
    padding: '5px',
    border: '1px solid #ddd',
  },
  td: {
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle !important',
    padding: '5px',
    border: '1px solid #ddd',
    backgroundClip: 'padding-box',
  },
  red: {
    backgroundColor: '#ffeeee',
  },
  blue: {
    backgroundColor: '#eeeeff',
  },
  redScore: {
    backgroundColor: '#ffdddd',
  },
  blueScore: {
    backgroundColor: '#ddddff',
  },
  winner: {
    fontWeight: 'bold',
  },
  selectedTeam: {
    textDecoration: 'underline',
  },
  dq: {
    textDecoration: 'line-through',
  },
  selectedTeamDQ: {
    textDecoration: 'underline line-through',
  },
  surrogate: {
    '& a': {
      borderBottom: '1px dotted',
    },
  },
  fakeLink: {
    color: theme.palette.primary.main,
  },
  rpDotA: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    height: '4px',
    width: '4px',
  },
  rpDotB: {
    position: 'absolute',
    top: '2px',
    left: '9px',
    height: '4px',
    width: '4px',
  },
  playIcon: {
    fontSize: 'inherit',
    margin: '-2px',
  },
  zeroDataContainer: {
    paddingTop: theme.spacing.unit*3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataIcon: {
    width: 40,
    height: 40,
    margin: '0 auto',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class MatchTable extends PureComponent {
  state = {
    isFirstRender: true,
  }
  renderRow(match) {
    let redScore = match.alliances.getIn(['red', 'score'])
    let blueScore = match.alliances.getIn(['blue', 'score'])
    if (!match.hasBeenPlayed()) {
      redScore = '?'
      blueScore = '?'
    }
    const redWin = match.winning_alliance === 'red'
    const blueWin = match.winning_alliance === 'blue'
    const rpEarnedTextA = match.rpEarnedTextA()
    const rpEarnedTextB = match.rpEarnedTextB()

    const { classes, selectedTeamKey } = this.props
    const isFirstRender = this.state.isFirstRender

    return (
      <tr key={match.key} className={classes.tr}>
        <td className={classes.td}>
          {match.videos.size > 0 && <Icon className={classes.playIcon}>play_circle_outline</Icon>}
        </td>
        {isFirstRender ?
          <td className={classNames({[classes.td]: true, [classes.fakeLink]: true})}>
            {match.getDisplayName()}
          </td>
          :
          <td className={classes.td}>
            <Link to={{pathname: `/match/${match.key}`, state: {modal: true}}}>{match.getDisplayName()}</Link>
          </td>
        }

        {match.alliances.getIn(['red', 'team_keys']).map(teamKey => {
          const teamNum = teamKey.substr(3)
          const dq = match.isDQ(teamKey)
          const surrogate = match.isSurrogate(teamKey)
          let teamEl = teamNum
          if (dq && surrogate) {
            teamEl = <Tooltip title="DQ | Surrogate" placement="top"><span>{teamNum}</span></Tooltip>
          } else if (dq) {
            teamEl = <Tooltip title="DQ" placement="top"><span>{teamNum}</span></Tooltip>
          } else if (surrogate) {
            teamEl = <Tooltip title="Surrogate" placement="top"><span>{teamNum}</span></Tooltip>
          }

          return (isFirstRender ?
            <td
              key={teamKey}
              className={classNames({
                  [classes.td]: true,
                  [classes.red]: true,
                  [classes.winner]: redWin,
                  [classes.selectedTeam]: teamKey === selectedTeamKey && !dq,
                  [classes.dq]: dq && teamKey !== selectedTeamKey,
                  [classes.selectedTeamDQ]: teamKey === selectedTeamKey && dq,
                  [classes.surrogate]: surrogate,
                  [classes.fakeLink]: true,
              })}
            >
              {teamNum}
            </td>
            :
            <td
              key={teamKey}
              className={classNames({
                  [classes.td]: true,
                  [classes.red]: true,
                  [classes.winner]: redWin,
                  [classes.selectedTeam]: teamKey === selectedTeamKey && !dq,
                  [classes.dq]: dq && teamKey !== selectedTeamKey,
                  [classes.selectedTeamDQ]: teamKey === selectedTeamKey && dq,
                  [classes.surrogate]: surrogate,
              })}
            >
              <Link to={{pathname: `/team/${teamNum}/${match.getYear()}`, hash: match.event_key, state: {modal: true}}}>
                {teamEl}
              </Link>
            </td>
          )
        })}
        {match.alliances.getIn(['blue', 'team_keys']).map(teamKey => {
          const teamNum = teamKey.substr(3)
          const dq = match.isDQ(teamKey)
          const surrogate = match.isSurrogate(teamKey)
          let teamEl = teamNum
          if (dq && surrogate) {
            teamEl = <Tooltip title="DQ | Surrogate" placement="top"><span>{teamNum}</span></Tooltip>
          } else if (dq) {
            teamEl = <Tooltip title="DQ" placement="top"><span>{teamNum}</span></Tooltip>
          } else if (surrogate) {
            teamEl = <Tooltip title="Surrogate" placement="top"><span>{teamNum}</span></Tooltip>
          }

          return (isFirstRender ?
            <td
              key={teamKey}
              className={classNames({
                  [classes.td]: true,
                  [classes.blue]: true,
                  [classes.winner]: blueWin,
                  [classes.selectedTeam]: teamKey === selectedTeamKey && !dq,
                  [classes.dq]: dq && teamKey !== selectedTeamKey,
                  [classes.selectedTeamDQ]: teamKey === selectedTeamKey && dq,
                  [classes.surrogate]: surrogate,
                  [classes.fakeLink]: true,
              })}
            >
              {teamNum}
            </td>
            :
            <td
              key={teamKey}
              className={classNames({
                  [classes.td]: true,
                  [classes.blue]: true,
                  [classes.winner]: blueWin,
                  [classes.selectedTeam]: teamKey === selectedTeamKey && !dq,
                  [classes.dq]: dq && teamKey !== selectedTeamKey,
                  [classes.selectedTeamDQ]: teamKey === selectedTeamKey && dq,
                  [classes.surrogate]: surrogate,
              })}
            >
              <Link to={{pathname: `/team/${teamNum}/${match.getYear()}`, hash: match.event_key, state: {modal: true}}}>
                {teamEl}
              </Link>
            </td>
          )
        })}
        {(!match.hasBeenPlayed() && (match.time || match.predicted_time)) ?
          <td colSpan='2' className={classes.td}>
            {match.predicted_time ?
              <Tooltip title={`Scheduled at ${match.getTimeStr()}`} placement="top">
                <i>{match.getPredictedTimeStr()}*</i>
              </Tooltip>
            :
              match.getTimeStr()
            }
          </td>
        : (
          <React.Fragment>
            <td className={classNames({
              [classes.td]: true,
              [classes.redScore]: true,
              [classes.winner]: redWin,
              [classes.selectedTeam]: match.isOnAlliance(selectedTeamKey, 'red'),
            })}>
              {match.rpEarnedA('red') && (
                isFirstRender ?
                <svg className={classes.rpDotA}>
                  <circle cx="2" cy="2" r="2"/>
                </svg>
                :
                <Tooltip title={rpEarnedTextA} placement="top">
                  <svg className={classes.rpDotA}>
                    <circle cx="2" cy="2" r="2"/>
                  </svg>
                </Tooltip>
              )}
              {match.rpEarnedB('red') && (
                isFirstRender ?
                  <svg className={classes.rpDotB}>
                    <circle cx="2" cy="2" r="2"/>
                  </svg>
                  :
                 <Tooltip title={rpEarnedTextB} placement="top">
                  <svg className={classes.rpDotB}>
                    <circle cx="2" cy="2" r="2"/>
                  </svg>
                </Tooltip>
              )}
              {redScore}
            </td>
            <td
              className={classNames({[classes.td]: true,
                [classes.blueScore]: true,
                [classes.winner]: blueWin,
                [classes.selectedTeam]: match.isOnAlliance(selectedTeamKey, 'blue')
            })}>
              {match.rpEarnedA('blue') && (
                isFirstRender ?
                <svg className={classes.rpDotA}>
                  <circle cx="2" cy="2" r="2"/>
                </svg>
                :
                <Tooltip title={rpEarnedTextA} placement="top">
                  <svg className={classes.rpDotA}>
                    <circle cx="2" cy="2" r="2"/>
                  </svg>
                </Tooltip>
              )}
              {match.rpEarnedB('blue') && (
                isFirstRender ?
                  <svg className={classes.rpDotB}>
                    <circle cx="2" cy="2" r="2"/>
                  </svg>
                  :
                 <Tooltip title={rpEarnedTextB} placement="top">
                  <svg className={classes.rpDotB}>
                    <circle cx="2" cy="2" r="2"/>
                  </svg>
                </Tooltip>
              )}
              {blueScore}
            </td>
          </React.Fragment>
        )}
      </tr>
    )
  }

  componentDidMount() {
    ReactDOM.unstable_deferredUpdates(() => this.setState({isFirstRender: false}))
  }

  render() {
    console.log('Render MatchTable')
    const { classes } = this.props

    if (this.props.matches === undefined) {
      return (
        <div className={classes.zeroDataContainer}>
          <CircularProgress color='secondary' size={100} className={classes.zeroDataSpinner} />
          <Typography variant='subheading'>Matches loading</Typography>
        </div>
      )
    } else if (this.props.matches.size === 0) {
      return (
        <div className={classes.zeroDataContainer}>
          <VideogameAssetIcon className={classes.zeroDataIcon} />
          <Typography variant='subheading'>No match results</Typography>
        </div>
      )
    }

    const qmMatches = this.props.matches.filter(match => match.get('comp_level') === 'qm')
    const efMatches = this.props.matches.filter(match => match.get('comp_level') === 'ef')
    const qfMatches = this.props.matches.filter(match => match.get('comp_level') === 'qf')
    const sfMatches = this.props.matches.filter(match => match.get('comp_level') === 'sf')
    const fMatches = this.props.matches.filter(match => match.get('comp_level') === 'f')

    return (
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classNames({[classes.tr]: true, [classes.key]: true})}>
            <th className={classes.th}><Icon className={classes.playIcon}>play_circle_outline</Icon></th>
            <th className={classes.th}>Match</th>
            <th className={classes.th} colSpan='3'>Red Alliance</th>
            <th className={classes.th} colSpan='3'>Blue Alliance</th>
            <th className={classes.th} colSpan='2'>Scores</th>
          </tr>
        </thead>
        <tbody>
          {qmMatches.size > 0 &&
            <tr className={classNames({[classes.tr]: true, [classes.key]: true})}>
              <th className={classes.th} colSpan='10'>Qualifications</th>
            </tr>
          }
          {qmMatches.size > 0 && qmMatches.map(match => this.renderRow(match))}
          {efMatches.size > 0 &&
            <tr className={classNames({[classes.tr]: true, [classes.key]: true})}>
              <th className={classes.th} colSpan='10'>Octo-Finals</th>
            </tr>
          }
          {efMatches.size > 0 && efMatches.map(match => this.renderRow(match))}
          {qfMatches.size > 0 &&
            <tr className={classNames({[classes.tr]: true, [classes.key]: true})}>
              <th className={classes.th} colSpan='10'>Quarterfinals</th>
            </tr>
          }
          {qfMatches.size > 0 && qfMatches.map(match => this.renderRow(match))}
          {sfMatches.size > 0 &&
            <tr className={classNames({[classes.tr]: true, [classes.key]: true})}>
              <th className={classes.th} colSpan='10'>Semifinals</th>
            </tr>
          }
          {sfMatches.size > 0 && sfMatches.map(match => this.renderRow(match))}
          {fMatches.size > 0 &&
            <tr className={classNames({[classes.tr]: true, [classes.key]: true})}>
              <th className={classes.th} colSpan='10'>Finals</th>
            </tr>
          }
          {fMatches.size > 0 && fMatches.map(match => this.renderRow(match))}
        </tbody>
      </table>
    )
  }
}

export default withStyles(styles)(MatchTable)
