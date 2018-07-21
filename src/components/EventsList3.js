import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import * as Event from '../database/Event'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'

import VirtualStickyHeaderList from './VirtualStickyHeaderList'
import EventListItem from './EventListItem'
import EventListSubheader from './EventListSubheader'

const styles = theme => ({
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    ['-webkit-overflow-scrolling']: 'touch', // Smooth scrolling on iOS
  },
  list: {
    padding: 0,
  },
  eventsCard: {
    margin: theme.spacing.unit,
    padding: `${theme.spacing.unit/2}px 0px 0px`,
  },
})

class EventsList extends PureComponent {
  state = {
    headers: [], // [{key1, text1}, {key2, text2}, ...]
    items: {}, // {key1: [item1, item2, ...]}
    scrollRef: null,
  }

  computeGroupedEvents = (events) => {
    let eventsByType = {}
    let eventsByDistrictLabel = {}
    let labelToDistrict = {}
    events.forEach(event => {
      if (event.isDistrictQual()) {
        let label = `${event.getIn(['district', 'display_name'])} District Events`
        if (eventsByDistrictLabel[label]) {
          eventsByDistrictLabel[label].push(event)
        } else {
          eventsByDistrictLabel[label] = [event]
          labelToDistrict[label] = event.getIn(['district', 'abbreviation'])
        }
      } else {
        const eventType = event.event_type
        if (eventsByType[eventType]) {
          eventsByType[eventType].push(event)
        } else {
          eventsByType[eventType] = [event]
        }
      }
    })

    // Combine everything in display order:
    // Regional, District Qualifier (alphabetical), District Div, District CMP, CMP DIV, CMP, FOC, Preseason, Offseason
    let headers = []
    let items = {}

    // Regionals
    if (eventsByType[Event.REGIONAL]) {
      headers.push({key: 'regionals', text: 'Regional Events'})
      items['regionals'] = eventsByType[Event.REGIONAL]
    }

    // District Quals
    let sortedLabels = []
    for (let label in eventsByDistrictLabel) {
      sortedLabels.push(label)
    }
    sortedLabels.sort()
    sortedLabels.forEach(label => {
      if (eventsByDistrictLabel[label]) {
        const key = `d-${labelToDistrict[label]}`
        headers.push({key: key, text: label})
        items[key] = eventsByDistrictLabel[label]
      }
    })

    // District CMP Divisions
    if (eventsByType[Event.DISTRICT_CMP_DIVISION]) {
      headers.push({key: 'dcd', text: 'District Championship Division'})
      items['dcd'] = eventsByType[Event.DISTRICT_CMP_DIVISION]
    }

    // District CMP
    if (eventsByType[Event.DISTRICT_CMP]) {
      headers.push({key: 'dc', text: 'District Championships'})
      items['dc'] = eventsByType[Event.DISTRICT_CMP]
    }

    // CMP Divisions
    if (eventsByType[Event.CMP_DIVISION]) {
      headers.push({key: 'cd', text: 'Championship Divisions'})
      items['cd'] = eventsByType[Event.CMP_DIVISION]
    }

    // CMP Finals
    if (eventsByType[Event.CMP_FINALS]) {
      headers.push({key: 'cf', text: 'Championship Finals'})
      items['cf'] = eventsByType[Event.CMP_FINALS]
    }

    // FoC
    if (eventsByType[Event.FOC]) {
      headers.push({key: 'foc', text: 'Festival of Champions'})
      items['foc'] = eventsByType[Event.FOC]
    }

    // Preseason
    if (eventsByType[Event.PRESEASON]) {
      headers.push({key: 'pe', text: 'Preseason Events'})
      items['pe'] = eventsByType[Event.PRESEASON]
    }

    // Offseason
    if (eventsByType[Event.OFFSEASON]) {
      headers.push({key: 'oe', text: 'Offseason Events'})
      items['oe'] = eventsByType[Event.OFFSEASON]
    }

    this.setState({headers, items})
  }

  componentDidMount() {
    if (this.props.events) {
      this.computeGroupedEvents(this.props.events)
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.events && this.props.events !== nextProps.events) {
      this.computeGroupedEvents(this.props.events)
    }
  }

  headerRenderer = ({headerIndex}) => {
    return <EventListSubheader text={this.state.headers[headerIndex].text} />
  }

  itemRenderer = ({headerKey, itemIndex, style}) => {
    const event = this.state.items[headerKey][itemIndex]
    return <EventListItem key={event.key} event={event} style={style} team={this.props.team} />
  }

  render() {
    console.log("Render EventsList")

    const { classes, scrollId } = this.props

    return (
      <ScrollRestoreContainer
        scrollId={scrollId}
        className={classes.scrollContainer}
        contentRef={el => {
          if (!this.state.scrollRef) {
            this.setState({scrollRef: el})
          }
        }}
      >
        <Paper className={classes.eventsCard}>
          <VirtualStickyHeaderList
            scrollElement={this.state.scrollRef}
            headers={this.state.headers}
            items={this.state.items}
            headerRenderer={this.headerRenderer}
            itemRenderer={this.itemRenderer}
            headerHeight={24}
            itemHeight={64}
            overscanCount={5}
          />
        </Paper>
      </ScrollRestoreContainer>
    )
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired,
  scrollId: PropTypes.string.isRequired,
  events: ImmutablePropTypes.list.isRequired,
  team: ImmutablePropTypes.record,
}

export default withStyles(styles)(EventsList)
