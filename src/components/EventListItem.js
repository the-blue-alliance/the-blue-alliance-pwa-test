import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
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
  name: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  nameMobile: {
    display: 'inline',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  webcastOnlineButton: {
    color: green[500],
  },
})

class EventListItem extends PureComponent {
  render() {
    const { classes, event, webcastStatus } = this.props

    let webcastButton = null
    if (event.webcasts.size > 0) {
      if (event.isNow()) {
        webcastButton = <Tooltip title={webcastStatus === 'online' ? 'Watch Now' : 'Webcast Offline'} placement='right'>
          <IconButton
            className={webcastStatus === 'online' ? classes.webcastOnlineButton : null}
            component='a'
            href={`https://www.thebluealliance.com/watch/${event.key}`}
            target='_blank'
          >
            {webcastStatus === 'offline' ? <VideocamOffIcon /> : <VideocamIcon />}
          </IconButton>
        </Tooltip>
      } else {
        webcastButton = <Tooltip title='Webcast Offline' placement='right'>
          <div>
            <IconButton color='default' disabled>
              <VideocamOffIcon />
            </IconButton>
          </div>
        </Tooltip>
      }
    }

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
              <Link to={`/event/${event.key}`}>
                <span className={classes.name}>{event.name}</span>
                <span className={classes.nameMobile}>{event.safeShortName()}</span>
              </Link>
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
            {webcastButton}
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
