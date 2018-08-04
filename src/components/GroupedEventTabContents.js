import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import SwipeableViews from 'react-swipeable-views'
import Button from '@material-ui/core/Button'
import EventIcon from '@material-ui/icons/Event'
import Zoom from '@material-ui/core/Zoom'

import EventsListAsync from './EventsListAsync'

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 1,
  },
})


class GroupedEventTabContents extends PureComponent {
  currentGroup = null

  tabHandleChangeIndex = index => {
    this.props.setPageState({activeEventGroup: this.props.groupedEvents.get(index).get('slug')});
  }

  componentDidMount() {
    const { activeEventGroup, groupedEvents, setPageState } = this.props

    // Calculate currentGroup
    for (let group of this.props.groupedEvents) {
      for (let event of group.get('events')) {
        if (!event.isPast()) {
          this.currentGroup = group.get('slug')
          break
        }
      }
      if (this.currentGroup) {
        break
      }
    }

    // Find current group by finding the first group with at least one event that isn't over
    if (activeEventGroup === null && groupedEvents) {
      if (this.currentGroup) {
        setPageState({activeEventGroup: this.currentGroup})
      } else {
        setPageState({activeEventGroup: 'week-1'})
      }
    }
  }

  render() {
    console.log("Render GroupedEventTabContents")

    const { classes, theme, activeEventGroup, groupedEvents } = this.props

    if (activeEventGroup === null) {
      return null
    }

    let groupToIndex = {}
    groupedEvents.forEach((group, index) => {
      groupToIndex[group.get('slug')] = index
    })

    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }

    return (
      <React.Fragment>
        <Zoom
          in={this.currentGroup !== null && activeEventGroup !== this.currentGroup}
          timeout={transitionDuration}
          style={{
            transitionDelay: activeEventGroup ? transitionDuration.exit : 0,
          }}
        >
          <Button
            variant='fab'
            className={classes.fab}
            color='secondary'
            onClick={() => this.props.setPageState({activeEventGroup: this.currentGroup})}
          >
            <EventIcon/>
          </Button>
        </Zoom>
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
                hasFAB={this.currentGroup !== null && slug !== this.currentGroup}
              />
            )
          })}
        </SwipeableViews>
      </React.Fragment>
    )
  }
}

GroupedEventTabContents.propTypes = {
  classes: PropTypes.object.isRequired,
  setPageState: PropTypes.func.isRequired,
  groupedEvents: ImmutablePropTypes.list,
  activeEventGroup: PropTypes.string,
}

export default withStyles(styles, { withTheme: true })(GroupedEventTabContents)
