// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'

// Components
import { CircularProgress } from 'material-ui/Progress'
import List from 'material-ui/List'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

// TBA Components
import EventListSubheader from './EventListSubheader'
import MatchListItem from './MatchListItem'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'

const styles = theme => ({
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  list: {
    padding: 0,
  },
})

class MatchList extends PureComponent {
  groupedMatches = []

  computeGroupedMatches = (matches) => {
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
    this.groupedMatches = []
    if (matchesByLevel['qm']) {
      this.groupedMatches.push((
        <div key={'qm'}>
          <EventListSubheader text='Qualification Matches' />
          {matchesByLevel['qm'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['ef']) {
      this.groupedMatches.push((
        <div key={'ef'}>
          <EventListSubheader text='Octo-final Matches' />
          {matchesByLevel['ef'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['qf']) {
      this.groupedMatches.push((
        <div key={'qf'}>
          <EventListSubheader text='Quarterfinal Matches' />
          {matchesByLevel['qf'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['sf']) {
      this.groupedMatches.push((
        <div key={'sf'}>
          <EventListSubheader text='Semifinal Matches' />
          {matchesByLevel['sf'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['f']) {
      this.groupedMatches.push((
        <div key={'f'}>
          <EventListSubheader text='Finals Matches' />
          {matchesByLevel['f'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
  }

  componentWillMount() {
    this.computeGroupedMatches(this.props.matches)
  }

  componentWillUpdate(nextProps, nextState) {
    this.computeGroupedMatches(nextProps.matches)
  }

  render() {
    console.log("Render MatchList")

    const { classes, scrollId } = this.props

    return (
      <ScrollRestoreContainer
        scrollId={scrollId}
        className={classes.scrollContainer}
      >
        <List subheader={<div />} className={classes.list} >
          {this.groupedMatches}
        </List>
      </ScrollRestoreContainer>
    )
  }
}

export default withStyles(styles)(MatchList)
