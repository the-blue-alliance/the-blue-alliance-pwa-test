// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'

// Components
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import EventIcon from 'material-ui-icons/Event'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Menu, { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import Scrollspy from 'react-scrollspy'

// TBA Components
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'
import EventFilterDialogContainer from '../containers/EventFilterDialogContainer'
import EventListCard from '../components/EventListCard'
import HideableBadge from '../components/HideableBadge'
import ScrollLink from '../components/ScrollLink'

const sideNavWidth = 160
const styles = theme => ({
  sideNav: {
    position: 'fixed',
    width: '100%',
    maxWidth: sideNavWidth,
    marginTop: theme.spacing.unit*3,
  },
  yearButton: {
    marginBottom: theme.spacing.unit*3,
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit*3,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  sideNavSectionContainer: {
    width: '100%',
    listStyleType: 'none',
    margin: 0,
    padding: theme.spacing.unit,
    '& a:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.primary[50],
      borderRight: `1px solid ${theme.palette.secondary.main}`,
    }
  },
  sideNavSection: {
    '& > a': {
      display: 'block',
      padding: '5px 10px',
    },
    '& > ul': {
      display: 'none',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    }
  },
  sideNavSectionActive: {
    '& > a': {
      fontWeight: 'bold',
      borderRight: `1px solid ${theme.palette.secondary.main}`,
    },
    '& > ul': {
      display: 'block',
    }
  },
  sideNavItem: {
    paddingLeft: 10,
    '& > a': {
      display: 'block',
      fontSize: 14,
      padding: '5px 20px',
    },
  },
  sideNavItemActive: {
    '& > a': {
      fontWeight: 'bold',
      borderRight: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  zeroDataContainer: {
    paddingTop: theme.spacing.unit*3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataIcon: {
    width: '15%',
    height: 'auto',
    margin: '0 auto',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class EventListPageDesktop extends PureComponent {
  state = {
    contentRef: null,
    yearMenuAnchorEl: null,
  }
  activeSection = null
  activeEventGroup = {
    'official': null,
    'unofficial': null,
  }

  updateActiveNavSection = (el) => {
    this.activeSection = el ? el.id : null
    if (this.activeEventGroup[this.activeSection]) {
      this.props.setPageState({activeEventGroup: this.activeEventGroup[this.activeSection]})
    }
  }

  updateActiveEventGroup = (el, section) => {
    this.activeEventGroup[section] = el ? el.id : null
    if (this.activeEventGroup[this.activeSection]) {
      this.props.setPageState({activeEventGroup: this.activeEventGroup[this.activeSection]})
    }
  }

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
    console.log("Render EventListPageDesktop")

    const { classes, year, validYears, groupedEvents, isLoading, yearMenuOpen, filterCount } = this.props
    const officialEventsGrouped = groupedEvents.filter(group => group.get('isOfficial'))
    const unofficialEventsGrouped = groupedEvents.filter(group => !group.get('isOfficial'))

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        contentRef={el => this.setState({contentRef: el})}
        refreshFunction={this.props.refreshFunction}
      >
        <ResponsiveLayout>
          <Grid container spacing={24}>
            <Grid item xs={3} lg={2}>
              <div className={classes.sideNav}>
                <Button
                  color='primary'
                  raised
                  fullWidth
                  onClick={this.handleYearOpen}
                  className={classes.yearButton}
                >
                  {`${year} Events`}<Icon className={classes.rightIcon}>arrow_drop_down</Icon>
                </Button>
                <Menu
                  anchorEl={this.state.yearMenuAnchorEl}
                  open={yearMenuOpen}
                  onClose={() => this.props.setYearMenuOpen(false)}
                  PaperProps={{
                    style: {
                      width: sideNavWidth,
                    },
                  }}
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

                {groupedEvents.size !== 0 &&
                  <div className={classes.buttonContainer}>
                    <HideableBadge
                      badgeContent={filterCount}
                      color='secondary'
                      hidden={filterCount === 0}
                    >
                      <Button
                        color='default'
                        raised
                        onClick={this.props.filterFunction}
                      >
                          <Icon className={classes.leftIcon}>filter_list</Icon>
                        Filter
                      </Button>
                    </HideableBadge>
                  </div>
                }
                {this.state.contentRef &&
                  <Scrollspy
                    rootEl={`.${this.state.contentRef.className}`}
                    items={['official', 'unofficial']}
                    currentClassName={classes.sideNavSectionActive}
                    className={classes.sideNavSectionContainer}
                    onUpdate={(el) => {this.updateActiveNavSection(el)}}
                  >
                    {officialEventsGrouped.size !== 0  &&
                      <li className={classes.sideNavSection}>
                        <ScrollLink scrollEl={this.state.contentRef} to='official'>Official Events</ScrollLink>
                        <Scrollspy
                          rootEl={`.${this.state.contentRef.className}`}
                          items={officialEventsGrouped.map(group => group.get('slug')).toJS()}
                          currentClassName={classes.sideNavItemActive}
                          onUpdate={(el) => this.updateActiveEventGroup(el, 'official')}
                        >
                          {officialEventsGrouped.map(group => {
                            return (
                              <li key={group.get('slug')} className={classes.sideNavItem}>
                                <ScrollLink scrollEl={this.state.contentRef} to={group.get('slug')}>{group.get('label')}</ScrollLink>
                              </li>
                            )
                          })}
                        </Scrollspy>
                      </li>
                    }
                    {unofficialEventsGrouped.size !== 0 &&
                      <li className={classes.sideNavSection}>
                        <ScrollLink scrollEl={this.state.contentRef} to='unofficial'>Unofficial Events</ScrollLink>
                        <Scrollspy
                          rootEl={`.${this.state.contentRef.className}`}
                          items={unofficialEventsGrouped.map(group => group.get('slug')).toJS()}
                          currentClassName={classes.sideNavItemActive}
                          onUpdate={(el) => this.updateActiveEventGroup(el, 'unofficial')}
                        >
                          {unofficialEventsGrouped.map(group => {
                            return (
                              <li key={group.get('slug')} className={classes.sideNavItem}>
                                <ScrollLink scrollEl={this.state.contentRef} to={group.get('slug')}>{group.get('label')}</ScrollLink>
                              </li>
                            )
                          })}
                        </Scrollspy>
                      </li>
                    }
                  </Scrollspy>
                }
              </div>
            </Grid>
            <Grid item xs={9} lg={10}>
              <h1>{year} <em>FIRST</em> Robotics Competition Events</h1>

              {groupedEvents.size === 0 &&
                <div className={classes.zeroDataContainer}>
                  {isLoading ?
                    <CircularProgress color='secondary' size='15%' className={classes.zeroDataSpinner} />
                    :
                    <EventIcon className={classes.zeroDataIcon} />
                  }
                  <Typography type='subheading'>{isLoading ? 'Events loading' : 'No events found'}</Typography>
                </div>
              }

              {officialEventsGrouped.size !== 0 &&
                <div id='official'>
                  <h2>Official Events</h2>
                  {officialEventsGrouped.map(group => {
                    return (
                      <div key={group.get('slug')} id={group.get('slug')}>
                        <Typography type='title' gutterBottom>{group.get('label')}</Typography>
                        <EventListCard events={group.get('events')}/>
                      </div>
                    )
                  })}
                </div>
              }
              {unofficialEventsGrouped.size !== 0 &&
                <div id='unofficial'>
                  <h2>Unofficial Events</h2>
                  {unofficialEventsGrouped.map(group => {
                    return (
                      <div key={group.get('slug')} id={group.get('slug')}>
                        <Typography type='title' gutterBottom>{group.get('label')}</Typography>
                        <EventListCard events={group.get('events')}/>
                      </div>
                    )
                  })}
                </div>
              }
            </Grid>
          </Grid>
        </ResponsiveLayout>
        <EventFilterDialogContainer year={year} />
      </TBAPageContainer>
    )
  }
}

EventListPageDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  filterFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  setPageState: PropTypes.func.isRequired,
  filterCount: PropTypes.number.isRequired,
  yearMenuOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
  groupedEvents: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventListPageDesktop)
