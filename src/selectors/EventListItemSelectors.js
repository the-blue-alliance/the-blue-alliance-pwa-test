import createCachedSelector from 're-reselect'

const getEventKey = (state, props) => {
  return props.event.key
}

const getLiveEvents = (state, props) => {
  return state.getIn(['firebase']).data.live_events
}

export const getWebcastStatus = createCachedSelector(
  getEventKey,
  getLiveEvents,
  (eventKey, liveEvents) => {
    if (liveEvents && liveEvents[eventKey] && liveEvents[eventKey].webcasts) {
      let status = 'unknown'
      liveEvents[eventKey].webcasts.forEach(w => {
        // Take the best of 'online', 'offline', or 'unknown' across all webcasts
        if (status === 'unknown' && w.status === 'offline') {
          status = 'offline'
        }
        if (w.status === 'online') {
          status = 'online'
        }
      })
      return status
    }
  }
)(
  (state, props) => getEventKey(state, props)
)
