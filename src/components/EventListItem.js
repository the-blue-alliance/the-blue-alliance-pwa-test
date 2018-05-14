import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  listItemText: {
    padding: 0,
  },
  dateContainer: {
    float: 'right',
    width: 150,
    textAlign: 'right',
  },
  locationContainer: {
    float: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 'calc(100% - 170px)',
  },
})

class EventListItem extends PureComponent {
  render() {
    const { classes, event, team } = this.props
    let to = `/event/${event.key}`
    if (team) {
      to = {pathname: `/team/${team.team_number}/${event.year}`, hash:event.event_code, state: {modal: true}}
    }
    return (
      <LinkContainer to={to}>
        <ListItem button divider disableRipple>
          <ListItemText
            className={classes.listItemText}
            disableTypography
            primary={event.short_name}
            secondary={
              <Typography>
                <span className={classes.locationContainer}>
                  {event.getCityStateCountry()}
                </span>
                <span className={classes.dateContainer}>
                  {event.getDateString()}
                </span>
              </Typography>
            }
          />
        </ListItem>
      </LinkContainer>
    )
  }
}

EventListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  event: ImmutablePropTypes.record.isRequired,
  team: ImmutablePropTypes.record,
}

export default withStyles(styles)(EventListItem)
