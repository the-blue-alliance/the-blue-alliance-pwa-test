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
import VisibilitySensor from 'react-visibility-sensor'

const styles = theme => ({
  eventListCard: {
    marginBottom: theme.spacing.unit*3,
  },
  eventListItem: {
    height: 60,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
  },
  eventListItemInvisibleWithoutDivider: {
    height: 60,
  },
  eventListItemInvisible: {
    height: 61,
  },
  hiddenDivider: {
    display: 'none',
  },
  verticalCenter: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

class EventListCard extends PureComponent {
  state = {fastRender: true}

  componentDidMount() {
    setTimeout(() => this.setState({ fastRender: false }), 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({ fastRender: true })
    }
  }

  componentDidUpdate() {
    setTimeout(() => this.setState({ fastRender: false }), 0)
  }

  render() {
    console.log("Render EventListCard")

    const { classes, events } = this.props

    return (
      <Paper className={classes.eventListCard} elevation={4}>
        {events.map((event, i) => {
          return (
            <VisibilitySensor
              key={event.key}
              partialVisibility
            >
              {({isVisible}) => {
                if (isVisible || !this.state.fastRender) {
                  return [
                    <div className={classes.eventListItem} key='content'>
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
                    </div>,
                    <Divider key='divider' className={events.size === i + 1 ? classes.hiddenDivider : null}/>,
                  ]
                } else {
                  return (events.size === i + 1 ?
                    <div className={classes.eventListItemInvisibleWithoutDivider} key='content' />
                    :
                    <div className={classes.eventListItemInvisible} key='content' />
                  )
                }
              }}
            </VisibilitySensor>
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
