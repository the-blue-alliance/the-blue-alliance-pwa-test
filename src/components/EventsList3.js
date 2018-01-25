import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'

import List from 'material-ui/List'

import * as Event from '../database/Event'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'
import EventListItem from './EventListItem'
import EventListSubheader from './EventListSubheader'

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

class EventsList extends PureComponent {
  groupedEvents = []

  computeGroupedEvents = (events) => {
    console.log("Computing event list!")

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
    // FoC, Regional, District Qualifier (alphabetical), District Div, District CMP, CMP DIV, CMP, Preseason, Offseason
    let sortedLabels = []
    for (let label in eventsByDistrictLabel) {
      sortedLabels.push(label)
    }
    sortedLabels.sort()

    this.groupedEvents = []
    // FoC
    if (eventsByType[Event.FOC]) {
      this.groupedEvents.push((
        <div key={'foc'}>
          <EventListSubheader text='Festival of Champions' />
          {eventsByType[Event.FOC].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }

    // Regionals
    if (eventsByType[Event.REGIONAL]) {
      this.groupedEvents.push((
        <div key={'r'}>
          <EventListSubheader text='Regionals' />
          {eventsByType[Event.REGIONAL].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }

    // District Quals
    sortedLabels.forEach(label => {
      if (eventsByDistrictLabel[label]) {
        this.groupedEvents.push((
          <div key={`d-${labelToDistrict[label]}`}>
            <EventListSubheader text={label} />
            {eventsByDistrictLabel[label].map(event =>
              <EventListItem key={event.get('key')} event={event}/>
            )}
          </div>
        ))
      }
    })

    // District CMP Divisions
    if (eventsByType[Event.DISTRICT_CMP_DIVISION]) {
      this.groupedEvents.push((
        <div key={'dcd'}>
          <EventListSubheader text='District Championship Divisions' />
          {eventsByType[Event.DISTRICT_CMP_DIVISION].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }

    // District CMP
    if (eventsByType[Event.DISTRICT_CMP]) {
      this.groupedEvents.push((
        <div key={'dc'}>
          <EventListSubheader text='District Championships' />
          {eventsByType[Event.DISTRICT_CMP].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }

    // CMP Divisions
    if (eventsByType[Event.CMP_DIVISION]) {
      this.groupedEvents.push((
        <div key={'cd'}>
          <EventListSubheader text='Championship Divisions' />
          {eventsByType[Event.CMP_DIVISION].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }

    // CMP Finals
    if (eventsByType[Event.CMP_FINALS]) {
      this.groupedEvents.push((
        <div key={'cf'}>
          <EventListSubheader text='Championship Finals' />
          {eventsByType[Event.CMP_FINALS].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }

    // Preseason
    if (eventsByType[Event.PRESEASON]) {
      this.groupedEvents.push((
        <div key={'pe'}>
          <EventListSubheader text='Preseason Events' />
          {eventsByType[Event.PRESEASON].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }

    // Offseason
    if (eventsByType[Event.OFFSEASON]) {
      this.groupedEvents.push((
        <div key={'oe'}>
          <EventListSubheader text='Offseason Events' />
          {eventsByType[Event.OFFSEASON].map(event =>
            <EventListItem key={event.get('key')} event={event}/>
          )}
        </div>
      ))
    }
  }

  componentWillMount() {
    this.computeGroupedEvents(this.props.events)
  }

  componentWillUpdate(nextProps, nextState) {
    this.computeGroupedEvents(nextProps.events)
  }

  render() {
    console.log("Render EventsList")

    const { classes, scrollId } = this.props

    return (
      <ScrollRestoreContainer
        scrollId={scrollId}
        className={classes.scrollContainer}
      >
        <List subheader={<div />} className={classes.list} >
          {this.groupedEvents}
        </List>
      </ScrollRestoreContainer>
    )
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired,
  scrollId: PropTypes.string.isRequired,
  events: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventsList)
