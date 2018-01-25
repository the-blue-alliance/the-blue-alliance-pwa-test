import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

import { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'

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
    const { classes, event } = this.props
    return (
      <LinkContainer to={`/event/${event.get('key')}`}>
        <ListItem button divider disableRipple>
          <ListItemText
            className={classes.listItemText}
            disableTypography
            primary={
              event.get('short_name')
            }
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
}

export default withStyles(styles)(EventListItem)
