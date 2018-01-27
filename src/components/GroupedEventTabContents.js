import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'

import SwipeableViews from 'react-swipeable-views'

import EventsList3 from './EventsList3'

const styles = theme => ({
})


class GroupedEventTabContents extends PureComponent {
  state = {
    fastRender: true,
  }
  tabContents = []
  groupToIndex = {}

  tabHandleChangeIndex = index => {
    this.props.setPageState({activeEventGroup: this.props.groupedEvents.get(index).get('slug')});
  }

  computeTabContents = (groupedEvents, fastRender) => {
    this.tabContents = groupedEvents.map((group) => {
      const slug = group.get('slug')
      if (!fastRender || slug === this.props.activeEventGroup) {
        return <EventsList3 key={slug} scrollId={slug} events={group.get('events')} />
      } else {
        return <div key={slug} />
      }
    }).toJS()

    groupedEvents.forEach((group, index) => {
      this.groupToIndex[group.get('slug')] = index
    })
  }

  componentWillMount() {
    this.computeTabContents(this.props.groupedEvents, this.state.fastRender)
  }

  componentDidMount() {
    // Render without cascading
    setTimeout(() => this.setState({ fastRender: false }), 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.groupedEvents !== nextProps.groupedEvents) {
      this.setState({ fastRender: true })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.groupedEvents !== nextProps.groupedEvents ||
        (this.state.fastRender && !nextState.fastRender)) {
      this.computeTabContents(nextProps.groupedEvents, nextState.fastRender)
    }
  }

  componentDidUpdate() {
    // Render without cascading
    setTimeout(() => this.setState({ fastRender: false }), 0)
  }

  render() {
    console.log("Render GroupedEventTabContents")

    const { activeEventGroup } = this.props

    return (
      <SwipeableViews
        containerStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        index={this.groupToIndex[activeEventGroup]}
        onChangeIndex={this.tabHandleChangeIndex}
      >
        {this.tabContents}
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
