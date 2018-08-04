import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import EventListItemDesktop from './EventListItemDesktop'
import EventListCardHeader from './EventListCardHeader'
import VirtualList from './VirtualList'

const styles = theme => ({
  eventListCard: {
    marginBottom: theme.spacing.unit*3,
  },
})

class EventListCard extends PureComponent {
  itemRenderer = ({itemIndex, style}) => {
    const event = this.props.events.get(itemIndex)
    return (
      <div key={event.key} style={style}>
        <EventListItemDesktop style={style} event={event} hasDivider={this.props.events.size === itemIndex + 1} />
      </div>
    )
  }

  render() {
    console.log("Render EventListCard")

    const { classes, scrollRef, events, label } = this.props

    return (
      <Paper className={classes.eventListCard} elevation={4}>
        <EventListCardHeader label={label}/>
        <VirtualList
          scrollElement={scrollRef}
          items={events}
          itemCount={events.size}
          itemRenderer={this.itemRenderer}
          itemHeight={61}
          overscanCount={5}
          renderAll
        />
      </Paper>
    )
  }
}

EventListCard.propTypes = {
  scrollRef: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  events: ImmutablePropTypes.list,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(EventListCard)
