import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  eventListCard: {
    marginBottom: theme.spacing.unit*3,
  },
  eventListItem: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
  },
  verticalCenter: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

class EventListCard extends PureComponent {
  render() {
    console.log("Render EventListCard")

    const { classes } = this.props

    return (
      <Paper className={classes.eventListCard} elevation={4}>
        {this.props.events.map((event, i) => {
          return (
            <div key={event.key}>
              <div className={classes.eventListItem}>
                <Grid container spacing={24}>
                  <Grid item xs={9}>
                    <div className={classes.verticalCenter}>
                      <Typography type='subheading' noWrap>
                        <Link to={`/event/${event.key}`}>{event.name}</Link>
                      </Typography>
                      <Typography type='body1'>
                        {event.getCityStateCountry()}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography type='body1' align='right' className={classes.verticalCenter}>
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
              {this.props.events.size !== i + 1 && <Divider />}
            </div>
          )
        })}
      </Paper>
    )
  }
}

EventListCard.propTypes = {
  classes: PropTypes.object.isRequired,
  events: ImmutablePropTypes.list,
}

export default withStyles(styles)(EventListCard)
