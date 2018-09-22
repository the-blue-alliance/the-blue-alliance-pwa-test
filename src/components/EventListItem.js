import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import green from '@material-ui/core/colors/green'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import { districtColors } from '../utils'

const styles = theme => ({
  eventListItem: {
    position: 'relative',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
  },
  eventListItemLive: {
    borderRight: `${theme.spacing.unit}px solid ${green[500]}`,
    paddingRight: theme.spacing.unit*2,
  },
  districtIndicator: {
    position: 'absolute',
    top: theme.spacing.unit / 2,
    left: theme.spacing.unit / 2,
    bottom: theme.spacing.unit / 2,
    width: theme.spacing.unit / 2,
    borderRadius: theme.spacing.unit / 2,
  },
  verticalCenter: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

class EventListItem extends PureComponent {
  render() {
    const { classes, event } = this.props
    return (
      <React.Fragment>
        <div
          className={
            classNames({
              [classes.eventListItem]: true,
              [classes.eventListItemLive]: event.isNow(),
            })
          }
        >
          {event.district && <div
            className={classes.districtIndicator}
            style={{ backgroundColor: districtColors[event.district.get('abbreviation')] }}
          />}
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <div className={classes.verticalCenter}>
                <Typography variant='subheading' noWrap>
                  <Link to={`/event/${event.key}`}>{event.name}</Link>
                </Typography>
                <Typography variant='body1'>
                  {event.getCityStateCountry()}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body1' align='right' className={classes.verticalCenter}>
                {event.getDateString()}
              </Typography>
            </Grid>
            {/*<Grid item xs={1}>
              <Tooltip title='Event webcast is offline' placement='right'>
                <IconButton color='default' disabled>
                  <Icon>videocam_off</Icon>
                </IconButton>
              </Tooltip>
            </Grid>*/}
          </Grid>
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
