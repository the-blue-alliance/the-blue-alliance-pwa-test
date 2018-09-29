// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

// Components
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'

const styles = theme => ({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: `1px ${theme.spacing.unit / 2}px`,
    fontSize: 14,
    textAlign: 'center',
    height: 60,
    [theme.breakpoints.up('lg')]: {
      height: 30,
    },
    color: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
  },
  listItemHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
  },
  videoIconContainer: {
    marginLeft: theme.spacing.unit / 2,
  },
  videoIcon: {
    top: '0.125em',
    position: 'relative',
  },
  matchName: {
    flexGrow: 1,
    flexBasis: 0,
    padding: `0px ${theme.spacing.unit / 2}px`,
  },
  match: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: 4,
    flexBasis: 0,
    height: '100%',
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '30%',
    overflow: 'hidden',
    border: '1px solid transparent',
    '& div': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.unit / 2,
      borderRadius: `0px ${theme.spacing.unit}px ${theme.spacing.unit}px 0px`,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
  },
  alliance: {
    display: 'flex',
    flexGrow: 1,
    width: '70%',
    [theme.breakpoints.up('lg')]: {
      width: '35%',
    },
    overflow: 'hidden',
    border: '1px solid transparent',
  },
  redAlliance: {
    borderRadius: `${theme.spacing.unit}px 0px 0px 0px`,
    [theme.breakpoints.up('lg')]: {
      borderRadius: `${theme.spacing.unit}px 0px 0px ${theme.spacing.unit}px`,
    },
    '& $team': {
      backgroundColor: theme.palette.type === 'light' ? '#FFEEEE' : '#803B3A',
    },
  },
  blueAlliance: {
    borderRadius: `0px 0px 0px ${theme.spacing.unit}px`,
    [theme.breakpoints.up('lg')]: {
      borderRadius: 0,
    },
    '& $team': {
      backgroundColor: theme.palette.type === 'light' ? '#EEEEFF' : '#3A3A80',
    },
  },
  team: {
    flexGrow: 1,
    flexBasis: 0,
    position: 'relative',
    padding: theme.spacing.unit / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    display: 'flex',
    flexGrow: 1,
    width: '30%',
    [theme.breakpoints.up('lg')]: {
      width: '15%',
    },
    overflow: 'hidden',
    border: '1px solid transparent',
    '& div': {
      flexGrow: 1,
      flexBasis: 0,
      position: 'relative',
      padding: theme.spacing.unit / 2,
    },
  },
  redScore: {
    borderRadius: `0px ${theme.spacing.unit}px 0px 0px`,
    '& div': {
      backgroundColor: theme.palette.type === 'light' ? '#FFDDDD' : '#802020',
    },
    [theme.breakpoints.up('lg')]: {
      borderRadius: 0,
    },
  },
  blueScore: {
    borderRadius: `0px 0px ${theme.spacing.unit}px 0px`,
    [theme.breakpoints.up('lg')]: {
      borderRadius: `0px ${theme.spacing.unit}px ${theme.spacing.unit}px 0px`,
    },
    '& div': {
      backgroundColor: theme.palette.type === 'light' ? '#DDDDFF' : '#202080',
    },
  },
  redWin: {
    fontWeight: 'bold',
  },
  blueWin: {
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
    borderBottom: '1px dotted',
  },
  rpDotA: {
    position: 'absolute',
    top: '2px',
    left: '3px',
    height: '6px',
    width: '6px',
  },
  rpDotB: {
    position: 'absolute',
    top: '2px',
    left: '9px',
    height: '6px',
    width: '6px',
  },
  favoriteDot: {
    position: 'absolute',
    top: 3,
    right: 3,
    height: 8,
    width: 8,
    '& circle': {
      fill: theme.palette.secondary.main,
    },
  },
})

class MatchListItem extends PureComponent {
  render() {
    const { classes, style, match, selectedTeamKey, favoriteTeamKeys } = this.props
    let redScore = match.alliances.getIn(['red', 'score'])
    let blueScore = match.alliances.getIn(['blue', 'score'])
    if (!match.hasBeenPlayed()) {
      redScore = '?'
      blueScore = '?'
    }
    const showTime = !match.hasBeenPlayed() && (match.time || match.predicted_time)
    const redWin = match.winning_alliance === 'red'
    const blueWin = match.winning_alliance === 'blue'

    return (
      <ListItem
        component='div'
        className={classes.listItem}
        style={style}
        divider
      >
        <div className={classes.videoIconContainer}>
          <PlayCircleOutlineIcon
            fontSize='inherit'
            className={classes.videoIcon}
            color={match.videos.size === 0 ? 'disabled' : 'inherit'}
          />
        </div>
        <Link
          className={classes.matchName}
          to={{pathname: `/match/${match.key}`, state: {modal: true}}}
        >
          {match.getDisplayName(true)}
        </Link>
        <div className={classes.match}>
          <div className={classNames({[classes.alliance]: true, [classes.redAlliance]: true,  [classes.redWin]: redWin})}>
            <Teams
              classes={classes}
              match={match}
              teamKeys={match.alliances.getIn(['red', 'team_keys'])}
              selectedTeamKey={selectedTeamKey}
              favoriteTeamKeys={favoriteTeamKeys}
            />
          </div>
          <div className={classNames({[classes.alliance]: true, [classes.blueAlliance]: true,  [classes.blueWin]: blueWin})}>
            <Teams
              classes={classes}
              match={match}
              teamKeys={match.alliances.getIn(['blue', 'team_keys'])}
              selectedTeamKey={selectedTeamKey}
              favoriteTeamKeys={favoriteTeamKeys}
            />
          </div>
          {!showTime && <div className={classNames({
              [classes.score]: true,
              [classes.redScore]: true,
              [classes.redWin]: redWin,
              [classes.selectedTeam]: match.isOnAlliance(selectedTeamKey, 'red')
            })}
          >
            <Score
              classes={classes}
              match={match}
              score={redScore}
            />
          </div>}
          {!showTime && <div className={classNames({
              [classes.score]: true,
              [classes.blueScore]: true,
              [classes.blueWin]: blueWin,
              [classes.selectedTeam]: match.isOnAlliance(selectedTeamKey, 'blue')
            })}
          >
            <Score
              classes={classes}
              match={match}
              score={blueScore}
              hasSelectedTeam={match.isOnAlliance(selectedTeamKey, 'blue')}
            />
          </div>}
          {showTime &&
            <div className={classes.time}>
              <div>
                <span>
                  {match.predicted_time ?
                    <Tooltip title={`Scheduled at ${match.getTimeStr()}`} placement="top">
                      <i>{match.getPredictedTimeStr()}*</i>
                    </Tooltip>
                  :
                    match.getTimeStr()
                  }
                </span>
              </div>
            </div>
          }
        </div>
      </ListItem>
    )
  }
}

MatchListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  match: ImmutablePropTypes.record.isRequired,
}

export default withStyles(styles)(MatchListItem)

function Teams({ classes, match, teamKeys, selectedTeamKey, favoriteTeamKeys }) {
  return teamKeys.map(teamKey => {
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

    return (
      <div
        key={teamKey}
        className={classes.team}
      >
        <Link
          className={classNames({
            [classes.selectedTeam]: teamKey === selectedTeamKey && !dq,
            [classes.dq]: dq && teamKey !== selectedTeamKey,
            [classes.selectedTeamDQ]: teamKey === selectedTeamKey && dq,
            [classes.surrogate]: surrogate,
          })}
          to={{pathname: `/team/${teamKey.substring(3)}/${match.getYear()}`, hash: match.event_key, state: {modal: true}}}
        >
          {teamEl}
          {favoriteTeamKeys.has(teamKey) &&
            <svg className={classes.favoriteDot}>
              <circle cx="2.5" cy="2.5" r="2.5"/>
            </svg>
          }
        </Link>
      </div>
    )
  })
}

function Score({ classes, match, score }) {
  const rpEarnedTextA = match.rpEarnedTextA()
  const rpEarnedTextB = match.rpEarnedTextB()

  return (
    <div>
      {match.rpEarnedA('red') &&
        <Tooltip title={rpEarnedTextA} placement="top">
          <svg className={classes.rpDotA}>
            <circle cx="2" cy="2" r="2"/>
          </svg>
        </Tooltip>
      }
      {match.rpEarnedB('red') &&
        <Tooltip title={rpEarnedTextB} placement="top">
          <svg className={classes.rpDotB}>
            <circle cx="2" cy="2" r="2"/>
          </svg>
        </Tooltip>
      }
      {score}
    </div>
  )
}


class MatchListItemHeader extends PureComponent {
  render() {
    const { classes } = this.props
    return (
      <ListItem
        component='div'
        className={classNames({[classes.listItem]: true, [classes.listItemHeader]: true})}
        divider
      >
        <div className={classes.videoIconContainer}>
          <PlayCircleOutlineIcon
            fontSize='inherit'
            className={classes.videoIcon}
            color='inherit'
          />
        </div>
        <div className={classes.matchName}>
          <strong>Match</strong>
        </div>
        <div className={classes.match}>
          <div className={classNames({[classes.alliance]: true, [classes.redAlliance]: true})}>
            <div className={classes.team}><strong>Red Alliance</strong></div>
          </div>
          <div className={classNames({[classes.alliance]: true, [classes.blueAlliance]: true})}>
            <div className={classes.team}><strong>Blue Alliance</strong></div>
          </div>
          <div className={classes.time}>
            <div><strong>Scores</strong></div>
          </div>
        </div>
      </ListItem>
    )
  }
}
export const MatchHeaderItem = withStyles(styles)(MatchListItemHeader)
