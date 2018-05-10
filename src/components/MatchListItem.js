// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'

// Components
import Grid from 'material-ui/Grid'
import { ListItem } from 'material-ui/List'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

const styles = theme => ({
  listItem: {
    padding: theme.spacing.unit / 2,
  },
  matchName: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  table: {
    padding: `${theme.spacing.unit}px 0`,
    margin: 0,
    width: '100%',
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
    borderCollapse: 'collapse',
    fontSize: '16px',
    '& tr': {
      padding: `${theme.spacing.unit}px 0`,
    },
    '& td': {
      position: 'relative',
      textAlign: 'center',
      verticalAlign: 'middle !important',
      padding: theme.spacing.unit,
    },
  },
  red: {
    backgroundColor: '#ffeeee',
  },
  blue: {
    backgroundColor: '#eeeeff',
  },
  redScore: {
    backgroundColor: '#ffdddd',
    fontWeight: 'bold',
  },
  blueScore: {
    backgroundColor: '#ddddff',
    fontWeight: 'bold',
  },
  redWin: {
    border: '2px solid red',
  },
  blueWin: {
    border: '2px solid blue',
  },
})

class MatchListItem extends PureComponent {
  render() {
    const { classes, match } = this.props
    const redWin = match.winning_alliance === 'red'
    const blueWin = match.winning_alliance === 'blue'
    return (
      <ListItem button divider disableRipple className={classes.listItem}>
        <Grid container className={classes.matchGrid}>
          <LinkContainer to={{pathname: `/match/${match.key}`, state: {modal: true}}}>
            <Grid item xs={3} className={classes.matchName}>
              {match.getCompLevel()}
              <br/>
              {match.getSetMatch(true)}
            </Grid>
          </LinkContainer>
          <Grid item xs={9}>
            <table className={classes.table}>
              <tbody>
                <tr className={classNames({[classes.tr]: true, [classes.redWin]: redWin})}>
                  {match.alliances.getIn(['red', 'team_keys']).map(teamKey => {
                    return (
                      <LinkContainer key={teamKey} to={{pathname: `/team/${teamKey.substring(3)}/${match.getYear()}`, hash: match.event_key.substring(4), state: {modal: true}}}>
                        <td className={classes.red}>{teamKey.substring(3)}</td>
                      </LinkContainer>
                      )
                  })}
                  <td className={classes.redScore}>{match.alliances.getIn(['red', 'score'])}</td>
                </tr>
                <tr className={classNames({[classes.tr]: true, [classes.blueWin]: blueWin})}>
                  {match.alliances.getIn(['blue', 'team_keys']).map(teamKey => {
                    return (
                      <LinkContainer key={teamKey} to={{pathname: `/team/${teamKey.substring(3)}/${match.getYear()}`, hash: match.event_key.substring(4), state: {modal: true}}}>
                        <td className={classes.blue}>{teamKey.substring(3)}</td>
                      </LinkContainer>
                    )
                  })}
                  <td className={classes.blueScore}>{match.alliances.getIn(['blue', 'score'])}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </ListItem>
    )
  }
}

MatchListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  match: ImmutablePropTypes.record.isRequired,
}

export default withStyles(styles)(MatchListItem)
