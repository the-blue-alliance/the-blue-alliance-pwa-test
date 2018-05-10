// General
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'

// Components
import List from 'material-ui/List'

// TBA Components
import EventListSubheader from './EventListSubheader'
import MatchListItem from './MatchListItem'

const styles = theme => ({
  list: {
    padding: 0,
  },
})

class MatchList extends PureComponent {
  state = {
    groupedMatches: [],
  }

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
    let groupedMatches = []
    if (matchesByLevel['qm']) {
      groupedMatches.push((
        <div key={'qm'}>
          <EventListSubheader text='Qualification Matches' />
          {matchesByLevel['qm'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['ef']) {
      groupedMatches.push((
        <div key={'ef'}>
          <EventListSubheader text='Octo-final Matches' />
          {matchesByLevel['ef'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['qf']) {
      groupedMatches.push((
        <div key={'qf'}>
          <EventListSubheader text='Quarterfinal Matches' />
          {matchesByLevel['qf'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['sf']) {
      groupedMatches.push((
        <div key={'sf'}>
          <EventListSubheader text='Semifinal Matches' />
          {matchesByLevel['sf'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    if (matchesByLevel['f']) {
      groupedMatches.push((
        <div key={'f'}>
          <EventListSubheader text='Finals Matches' />
          {matchesByLevel['f'].map(match =>
            <MatchListItem key={match.key} match={match} />
          )}
        </div>
      ))
    }
    this.setState({groupedMatches})
  }

  componentDidMount() {
    if (this.props.matches) {
      this.computeGroupedMatches(this.props.matches)
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.matches && this.props.matches !== nextProps.matches) {
      this.computeGroupedMatches(this.props.matches)
    }
  }

  render() {
    console.log("Render MatchList")

    const { classes } = this.props

    return (
      <List subheader={<div />} className={classes.list} >
        {this.state.groupedMatches}
      </List>
    )
  }
}

export default withStyles(styles)(MatchList)
