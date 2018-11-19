import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import WindowScrollerList from './WindowScrollerList'

const styles = theme => ({
  zeroDataContainer: {
    padding: theme.spacing.unit*3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class TeamRow extends PureComponent {
  render() {
    const { team, year } = this.props
    const cityStateCountry = team.getCityStateCountry()
    let to = `/team/${team.get('team_number')}`
    if (year) {
      to += `/${year}`
    }
    return (
      <ListItem divider>
        <ListItemText
          primary={
            <Typography noWrap>
              <Link to={to}>
                {`${team.get('team_number')} | ${team.get('nickname')}`}
              </Link>
            </Typography>
          }
          secondary={cityStateCountry ? cityStateCountry : '--'}
        />
      </ListItem>
    )
  }
}

class TeamsList extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const team = this.props.teams.get(index)
    return (
      <div key={team.get('key')} style={style}>
        <TeamRow team={team} year={this.props.year} />
      </div>
    )
  }

  render() {
    console.log("Render TeamsList")
    const { classes, teams } = this.props

    return (
      <Paper>
        {teams !== undefined ?
          <WindowScrollerList
            scrollElement={this.props.scrollElement}
            rowCount={teams.size}
            rowHeight={65}
            rowRenderer={this.rowRenderer}
          />
          :
          <div className={classes.zeroDataContainer}>
            <CircularProgress color='secondary' size={120} className={classes.zeroDataSpinner} />
            <Typography variant='subtitle1'>Teams loading</Typography>
          </div>
        }
      </Paper>
    )
  }
}

export default withStyles(styles)(TeamsList)
