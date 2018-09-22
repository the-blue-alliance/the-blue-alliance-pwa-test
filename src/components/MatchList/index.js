// General
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'

// TBA Components
import MatchListSubheader from './MatchListSubheader'
import MatchListItemContainer from '../../containers/MatchListItemContainer'


const styles = theme => ({
  zeroDataContainer: {
    padding: theme.spacing.unit*2,
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

class MatchList extends Component {
  computeGroupedMatches = matches => {
    console.log("Computing match list!")

    let matchesByLevel = {}
    matches.forEach(match => {
      const matchLevel = match.comp_level
      if (matchesByLevel[matchLevel]) {
        matchesByLevel[matchLevel].push(match)
      } else {
        matchesByLevel[matchLevel] = [match]
      }
    })

    // Combine everything in display order:
    // qual, ef, qf, sf, f
    let headers = []
    let items = {}
    if (matchesByLevel['qm']) {
      headers.push({key: 'qm', text: 'Qualification Matches'})
      items['qm'] = matchesByLevel['qm']
    }
    if (matchesByLevel['ef']) {
      headers.push({key: 'ef', text: 'Octo-final Matches'})
      items['ef'] = matchesByLevel['ef']
    }
    if (matchesByLevel['qf']) {
      headers.push({key: 'qf', text: 'Quarterfinal Matches'})
      items['qf'] = matchesByLevel['qf']
    }
    if (matchesByLevel['sf']) {
      headers.push({key: 'sf', text: 'Semifinal Matches'})
      items['sf'] = matchesByLevel['sf']
    }
    if (matchesByLevel['f']) {
      headers.push({key: 'f', text: 'Finals Matches'})
      items['f'] = matchesByLevel['f']
    }
    return { headers, items }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { matches, teamKey } = this.props
    const { matches: nextMatches, teamKey: nextTeamKey } = nextProps

    if (teamKey !== nextTeamKey) {
      return true
    }

    if (matches === undefined) {
      if (nextMatches === undefined) {
        return false
      } else {
        return true
      }
    } else {
      if (nextMatches === undefined) {
        return true
      } else {
        // Order matters, so just check for equality
        matches.forEach((match, i) => {
          if (match !== nextMatches.get(i)) {
            return true
          }
        })
        return false
      }
    }
  }

  render() {
    console.log("Render MatchList")

    const { classes, matches, teamKey } = this.props

    if (matches === undefined) {
      return (
        <div className={classes.zeroDataContainer}>
          <CircularProgress color='secondary' size={60} className={classes.zeroDataSpinner} />
          <Typography variant='subheading'>Matches loading</Typography>
        </div>
      )
    } else if (matches.size === 0) {
      return (
        <div className={classes.zeroDataContainer}>
          <VideogameAssetIcon className={classes.zeroDataIcon} />
          <Typography variant='subheading'>No match results</Typography>
        </div>
      )
    }

    const { headers, items } = this.computeGroupedMatches(matches)

    return (
      <List subheader={<div />} disablePadding>
        {headers.map((header, headerIndex) => {
          return (
            <div key={header.key}>
              <MatchListSubheader text={headers[headerIndex].text} />
              {items[header.key].map(match => {
                return <MatchListItemContainer key={match.key} match={match} selectedTeamKey={teamKey}/>
              })}
            </div>
          )
        })}
      </List>
    )
  }
}

export default withStyles(styles)(MatchList)
