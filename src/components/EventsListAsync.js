import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import EventsList3 from './EventsList3'


class EventsListAsync extends PureComponent {
  state = {
    isFirstRender: true,
    hasBeenRendered: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isVisible) {
      return {hasBeenRendered: true}
    }
    return null
  }

  componentDidMount() {
    requestIdleCallback(() => this.setState({ isFirstRender: false }))
  }

  render() {
    console.log("Render EventsListAsync")

    const { isVisible, ...restProps } = this.props

    if (isVisible || !this.state.isFirstRender || this.state.hasBeenRendered) {
      return (
        <EventsList3 {...restProps} />
      )
    } else {
      return <div />
    }
  }
}

EventsListAsync.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default EventsListAsync
