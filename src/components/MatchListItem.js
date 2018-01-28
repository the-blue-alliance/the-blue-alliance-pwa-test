// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'

// Components
import Grid from 'material-ui/Grid'
import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

const styles = theme => ({
  table: {
    padding: '5px 0',
    margin: 0,
    width: '100%',
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
    borderCollapse: 'collapse',
    fontSize: '14px',
    '& tr': {
      padding: '5px 0',
    },
    '& td': {
      position: 'relative',
      textAlign: 'center',
      verticalAlign: 'middle !important',
      padding: '5px',
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
      <LinkContainer to={{pathname: `/match/${match.key}`, state: {modal: true}}}>
        <ListItem button divider disableRipple>
          <Grid container spacing={24} className={classes.matchGrid}>
            <Grid item xs={3}>
              {match.getDisplayName(true)}
            </Grid>
            <Grid item xs={8}>
              <table className={classes.table}>
                <tbody>
                  <tr className={classNames({[classes.tr]: true, [classes.redWin]: redWin})}>
                    {match.alliances.getIn(['red', 'team_keys']).map(teamKey => {
                      return <td key={teamKey} className={classes.red}>{teamKey.substring(3)}</td>
                    })}
                    <td className={classes.redScore}>{match.alliances.getIn(['red', 'score'])}</td>
                  </tr>
                  <tr className={classNames({[classes.tr]: true, [classes.blueWin]: blueWin})}>
                    {match.alliances.getIn(['blue', 'team_keys']).map(teamKey => {
                      return <td key={teamKey} className={classes.blue}>{teamKey.substring(3)}</td>
                    })}
                    <td className={classes.blueScore}>{match.alliances.getIn(['blue', 'score'])}</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
        </ListItem>
      </LinkContainer>
    )
  }
}

MatchListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  match: ImmutablePropTypes.record.isRequired,
}

export default withStyles(styles)(MatchListItem)
