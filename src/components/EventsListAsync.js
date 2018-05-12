import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import EventsList3 from './EventsList3'


class EventsListAsync extends PureComponent {
  state = {
    isFirstRender: true,
  }

  componentDidMount() {
    ReactDOM.unstable_deferredUpdates(() => this.setState({ isFirstRender: false }))
  }

  render() {
    console.log("Render EventsListAsync")

    const { isVisible, ...restProps } = this.props

    if (isVisible || !this.state.isFirstRender) {
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
