import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import green from '@material-ui/core/colors/green'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'

import { districtColors } from '../utils'

const styles = theme => ({
  eventListItem: {
    display: 'flex',
    position: 'relative',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
  },
  eventLiveIndicator: {
    position: 'absolute',
    top: theme.spacing.unit / 2,
    right: theme.spacing.unit / 2,
    bottom: theme.spacing.unit / 2,
    width: theme.spacing.unit / 2,
    borderRadius: theme.spacing.unit / 2,
    backgroundColor: green[500],
  },
  districtIndicator: {
    position: 'absolute',
    top: theme.spacing.unit / 2,
    left: theme.spacing.unit / 2,
    bottom: theme.spacing.unit / 2,
    width: theme.spacing.unit / 2,
    borderRadius: theme.spacing.unit / 2,
  },
  eventNameLocationContainer: {
    display: 'flex',
    flexGrow: 1,
    width: '55%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  eventDateContainer: {
    display: 'flex',
    flexGrow: 1,
    width: '30%',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  eventWebcastButtonContainer: {
    width: 48,
  },
})

class EventListItem extends PureComponent {
  render() {
    const { classes, event } = this.props
    return (
      <React.Fragment>
        <div className={classes.eventListItem}>
          {event.district && <div
            className={classes.districtIndicator}
            style={{ backgroundColor: districtColors[event.district.get('abbreviation')] }}
          />}
          {event.isNow() && <div className={classes.eventLiveIndicator} />}

          <div className={classes.eventNameLocationContainer}>
            <Typography variant='subheading' noWrap>
              <Link to={`/event/${event.key}`}>{event.name}</Link>
            </Typography>
            <Typography variant='body1' noWrap>
              {event.getCityStateCountry()}
            </Typography>
          </div>

          <div className={classes.eventDateContainer}>
            <Typography variant='body1'>
              {event.getDateString()}
            </Typography>
          </div>

          <div className={classes.eventWebcastButtonContainer}>
            {event.webcasts.size > 0 && (
              event.isNow() ?
              <Tooltip title='Watch Now' placement='right'>
                <div>
                  <IconButton color='default'>
                    <VideocamIcon />
                  </IconButton>
                </div>
              </Tooltip>
              :
              <Tooltip title='Event webcast is offline' placement='right'>
                <div>
                  <IconButton color='default' disabled>
                    <VideocamOffIcon />
                  </IconButton>
                </div>
              </Tooltip>
            )}
          </div>

        </div>
        <Divider />
      </React.Fragment>
    )
  }
}

EventListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  event: ImmutablePropTypes.record.isRequired,
}

export default withStyles(styles)(EventListItem)
