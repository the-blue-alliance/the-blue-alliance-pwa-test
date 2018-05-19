// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'

// TBA Components
import VirtualStickyHeaderList from './VirtualStickyHeaderList'
import EventListSubheader from './EventListSubheader'
import MatchListItem from './MatchListItem'


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

class MatchList extends PureComponent {
  state = {
    headers: [], // [{key1, text1}, {key2, text2}, ...]
    items: {}, // {key1: [item1, item2, ...]}
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
    this.setState({headers, items})
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

  headerRenderer = ({headerIndex}) => {
    return <EventListSubheader text={this.state.headers[headerIndex].text} />
  }

  itemRenderer = ({headerKey, itemIndex, style}) => {
    const match = this.state.items[headerKey][itemIndex]
    return <MatchListItem key={match.key} match={match} style={style} selectedTeamKey={this.props.selectedTeamKey}/>
  }

  render() {
    console.log("Render MatchList")

    const { classes, scrollElement, matches } = this.props

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

    return (
      <VirtualStickyHeaderList
        scrollElement={scrollElement}
        headers={this.state.headers}
        items={this.state.items}
        headerRenderer={this.headerRenderer}
        itemRenderer={this.itemRenderer}
        headerHeight={24}
        itemHeight={88}
        overscanCount={5}
      />
    )
  }
}

export default withStyles(styles)(MatchList)
