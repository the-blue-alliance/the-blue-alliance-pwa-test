import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import SwipeableViews from 'react-swipeable-views'

import EventsListAsync from './EventsListAsync'

const styles = theme => ({
})


class GroupedEventTabContents extends PureComponent {
  tabHandleChangeIndex = index => {
    this.props.setPageState({activeEventGroup: this.props.groupedEvents.get(index).get('slug')});
  }

  render() {
    console.log("Render GroupedEventTabContents")

    const { activeEventGroup, groupedEvents } = this.props

    let groupToIndex = {}
    groupedEvents.forEach((group, index) => {
      groupToIndex[group.get('slug')] = index
    })

    return (
      <SwipeableViews
        containerStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        index={groupToIndex[activeEventGroup]}
        onChangeIndex={this.tabHandleChangeIndex}
      >
        {groupedEvents.map((group) => {
          const slug = group.get('slug')
          return (
            <EventsListAsync
              key={slug}
              scrollId={slug}
              events={group.get('events')}
              isVisible={slug === activeEventGroup}
            />
          )
        })}
      </SwipeableViews>
    )
  }
}

GroupedEventTabContents.propTypes = {
  classes: PropTypes.object.isRequired,
  setPageState: PropTypes.func.isRequired,
  groupedEvents: ImmutablePropTypes.list,
  activeEventGroup: PropTypes.string.isRequired,
}

export default withStyles(styles)(GroupedEventTabContents)
