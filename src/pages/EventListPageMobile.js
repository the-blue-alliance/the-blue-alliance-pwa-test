import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import ButtonBase from '@material-ui/core/ButtonBase'
import CircularProgress from '@material-ui/core/CircularProgress'
import EventIcon from '@material-ui/icons/Event'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Typography from '@material-ui/core/Typography'

import TBAPageContainer from '../containers/TBAPageContainer'
import EventFilterDialogContainer from '../containers/EventFilterDialogContainer'
import GroupedEventTabsContainer from '../containers/GroupedEventTabsContainer'
import GroupedEventTabContentsContainer from '../containers/GroupedEventTabContentsContainer'

const styles = theme => ({
  yearSelector: {
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  zeroDataContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataIcon: {
    width: '25%',
    height: 'auto',
    margin: '0 auto',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class EventListPageMobile extends PureComponent {
  state = {
    yearMenuAnchorEl: null,
  }
  tabRefs = {}

  handleYearOpen = event => {
    this.setState({ yearMenuAnchorEl: event.currentTarget });
    this.props.setYearMenuOpen(true)
  }

  handleYearSelect = year => {
    this.props.setYearMenuOpen(false)
    if (year !== this.props.year) {
      this.props.pushHistory(`/events/${year}`)
    }
  }

  render() {
    console.log("Render EventListPageMobile")

    const { classes, year, validYears, groupedEvents, yearMenuOpen, filterCount } = this.props

    const hasEvents = groupedEvents && groupedEvents.size !== 0

    return (
      <TBAPageContainer
        title={
          <ButtonBase
            className={classes.yearSelector}
            onClick={this.handleYearOpen}
          >
            <Typography variant='title' color='inherit'>
              {`${year} Events`}
            </Typography>
            <Icon>arrow_drop_down</Icon>
          </ButtonBase>
        }
        refreshFunction={this.props.refreshFunction}
        filterFunction={this.props.filterFunction}
        filterCount={filterCount}
        tabs={hasEvents && <GroupedEventTabsContainer groupedEvents={groupedEvents}/>}
      >
        {hasEvents ?
          <GroupedEventTabContentsContainer groupedEvents={groupedEvents}/>
          :
          <React.Fragment>
            {groupedEvents ?
              <div className={classes.zeroDataContainer}>
                <EventIcon className={classes.zeroDataIcon} />
                <Typography variant='subheading'>No events</Typography>
              </div>
              :
              <div className={classes.zeroDataContainer}>
                <CircularProgress color='secondary' size={120} className={classes.zeroDataSpinner} />
                <Typography variant='subheading'>Events loading'</Typography>
              </div>
            }
          </React.Fragment>
        }
        <EventFilterDialogContainer year={year} />
        <Menu
          anchorEl={this.state.yearMenuAnchorEl}
          open={yearMenuOpen}
          onClose={() => this.props.setYearMenuOpen(false)}
        >
          {validYears.map(y =>
            <MenuItem
              key={y}
              selected={y === year}
              onClick={() => this.handleYearSelect(y)}
            >
              {y} Events
            </MenuItem>
          )}
        </Menu>
      </TBAPageContainer>
    )
  }
}

EventListPageMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  filterFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  setPageState: PropTypes.func.isRequired,
  filterCount: PropTypes.number.isRequired,
  yearMenuOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
  groupedEvents: ImmutablePropTypes.list,
}

export default withStyles(styles)(EventListPageMobile)
