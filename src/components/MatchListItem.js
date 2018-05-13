// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'

// Components
import ButtonBase from 'material-ui/ButtonBase'
import { ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

const styles = theme => ({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing.unit / 2,
    height: 88,
  },
  matchName: {
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  match: {
    flexGrow: 4,
    flexBasis: 0,
    textAlign: 'center',
  },
  alliance: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: theme.spacing.unit,
    border: '2px solid transparent',
  },
  redAlliance: {
    '& $team': {
      backgroundColor: '#ffeeee',
    },
    '& $score': {
      backgroundColor: '#ffdddd',
    },
  },
  blueAlliance: {
    '& $team': {
      backgroundColor: '#eeeeff',
    },
    '& $score': {
      backgroundColor: '#ddddff',
    },
  },
  team: {
    flexGrow: 3,
    flexBasis: 0,
    padding: theme.spacing.unit,
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
  score: {
    position: 'relative',
    flexGrow: 2,
    flexBasis: 0,
    padding: theme.spacing.unit,
    fontWeight: 'bold',
  },
  redWin: {
    border: '2px solid red',
  },
  blueWin: {
    border: '2px solid blue',
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
    top: '3px',
    left: '3px',
    height: '4px',
    width: '4px',
  },
  rpDotB: {
    position: 'absolute',
    top: '3px',
    left: '10px',
    height: '4px',
    width: '4px',
  },
})

class MatchListItem extends PureComponent {
  render() {
    const { classes, style, match, selectedTeamKey } = this.props
    let redScore = match.alliances.getIn(['red', 'score'])
    let blueScore = match.alliances.getIn(['blue', 'score'])
    if (redScore === -1) {
      redScore = '?'
    }
    if (blueScore === -1) {
      blueScore = '?'
    }
    const redWin = match.winning_alliance === 'red'
    const blueWin = match.winning_alliance === 'blue'

    return (
      <ListItem
        className={classes.listItem}
        component={Link}
        to={{pathname: `/match/${match.key}`, state: {modal: true}}}
        style={style}
        button
        divider
        disableRipple
      >
        <div className={classes.matchName}>
          {match.getCompLevel()}
          <br/>
          {match.getSetMatch(true)}
        </div>
        <div className={classes.match}>
          <div className={classNames({[classes.alliance]: true, [classes.redAlliance]: true,  [classes.redWin]: redWin})}>
            {match.alliances.getIn(['red', 'team_keys']).map(teamKey => {
              const teamNum = teamKey.substr(3)
              const dq = match.isDQ(teamKey)
              const surrogate = match.isSurrogate(teamKey)
              return (
                <LinkContainer
                  key={teamKey}
                  component="div"
                  to={{pathname: `/team/${teamKey.substring(3)}/${match.getYear()}`, hash: match.event_key, state: {modal: true}}}
                >
                  <ButtonBase
                    className={classes.team}
                  >
                    <div
                      className={classNames({
                        [classes.selectedTeam]: teamKey === selectedTeamKey && !dq,
                        [classes.dq]: dq && teamKey !== selectedTeamKey,
                        [classes.selectedTeamDQ]: teamKey === selectedTeamKey && dq,
                        [classes.surrogate]: surrogate,
                      })}
                    >
                      {teamNum}
                    </div>
                  </ButtonBase>
                </LinkContainer>
              )
            })}
            <div className={classNames({
              [classes.score]: true,
              [classes.selectedTeam]: match.isOnAlliance(selectedTeamKey, 'red')
            })}>
              {match.rpEarnedA('red') &&
                <svg className={classes.rpDotA}>
                  <circle cx="2" cy="2" r="2"/>
                </svg>
              }
              {match.rpEarnedB('red') &&
                <svg className={classes.rpDotB}>
                  <circle cx="2" cy="2" r="2"/>
                </svg>
              }
              {redScore}
            </div>
          </div>
          <div className={classNames({[classes.alliance]: true, [classes.blueAlliance]: true,  [classes.blueWin]: blueWin})}>
            {match.alliances.getIn(['blue', 'team_keys']).map(teamKey => {
              const teamNum = teamKey.substr(3)
              const dq = match.isDQ(teamKey)
              const surrogate = match.isSurrogate(teamKey)
              return (
                <LinkContainer
                  key={teamKey}
                  component="div"
                  to={{pathname: `/team/${teamKey.substring(3)}/${match.getYear()}`, hash: match.event_key, state: {modal: true}}}
                >
                  <ButtonBase
                    className={classes.team}
                  >
                    <div
                      className={classNames({
                        [classes.selectedTeam]: teamKey === selectedTeamKey && !dq,
                        [classes.dq]: dq && teamKey !== selectedTeamKey,
                        [classes.selectedTeamDQ]: teamKey === selectedTeamKey && dq,
                        [classes.surrogate]: surrogate,
                      })}
                    >
                      {teamNum}
                    </div>
                  </ButtonBase>
                </LinkContainer>
              )
            })}
            <div className={classNames({
              [classes.score]: true,
              [classes.selectedTeam]: match.isOnAlliance(selectedTeamKey, 'blue')
            })}>
              {match.rpEarnedA('blue') &&
                <svg className={classes.rpDotA}>
                  <circle cx="2" cy="2" r="2"/>
                </svg>
              }
              {match.rpEarnedB('blue') &&
                <svg className={classes.rpDotB}>
                  <circle cx="2" cy="2" r="2"/>
                </svg>
              }
              {blueScore}
            </div>
          </div>
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
