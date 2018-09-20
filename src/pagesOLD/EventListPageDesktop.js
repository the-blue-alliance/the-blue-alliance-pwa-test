// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

// Components
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import EventIcon from '@material-ui/icons/Event'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'

// TBA Components
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'
import EventFilterContainer from '../containers/EventFilterContainer'
import EventListCard from '../components/EventListCard'
import ScrollLink from '../components/ScrollLink'
import NestedScrollspy from '../components/NestedScrollspy'

const sideNavWidth = 160
const styles = theme => ({
  sideNav: {
    position: 'sticky',
    top: 0,
    height: 'calc(100vh - 8rem)',
    width: '100%',
    maxWidth: sideNavWidth,
    paddingTop: theme.spacing.unit*3,
  },
  rightBar: {
    position: 'sticky',
    top: 0,
    height: 'calc(100vh - 8rem)',
    width: '100%',
    paddingTop: theme.spacing.unit*3,
  },
  scrollSpyContainer: {
    height: 'calc(100vh - 10rem)',
    overflowY: 'auto',
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
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: theme.zIndex.appBar,
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

  scrollspyActiveCallback = (section, item) => {
    this.props.setPageState({activeEventGroup: item})
  }

  render() {
    console.log("Render EventListPageDesktop")

    const { classes, theme, year, validYears, groupedEvents, yearMenuOpen } = this.props
    const officialEventsGrouped = groupedEvents && groupedEvents.filter(group => group.get('isOfficial'))
    const unofficialEventsGrouped = groupedEvents && groupedEvents.filter(group => !group.get('isOfficial'))

    let sections = []
    if (officialEventsGrouped && officialEventsGrouped.size > 0) {
      sections.push('official')
    }
    if (unofficialEventsGrouped && unofficialEventsGrouped.size > 0) {
      sections.push('unofficial')
    }

    // Find current group by finding the first group with at least one event that isn't over
    let currentGroup = null
    if (groupedEvents) {
      for (let group of groupedEvents) {
        for (let event of group.get('events')) {
          if (!event.isPast()) {
            currentGroup = group.get('slug')
            break
          }
        }
        if (currentGroup) {
          break
        }
      }
    }

    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }

    return (
      <TBAPageContainer
        contentRef={el => this.setState({contentRef: el})}
        refreshFunction={this.props.refreshFunction}
      >
        {this.state.contentRef &&
          <Zoom
            in={currentGroup !== null}
            timeout={transitionDuration}
            unmountOnExit
          >
            <ScrollLink
              scrollEl={this.state.contentRef}
              to={currentGroup}
              component={Button}
              variant='fab'
              className={classes.fab}
              color='secondary'
            >
              <EventIcon/>
            </ScrollLink>
          </Zoom>
        }
        <ResponsiveLayout>
          <Grid container spacing={24}>
            <Grid item xs={3} lg={2}>
              <div className={classes.sideNav}>
                <Button
                  color='primary'
                  variant="raised"
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

                {this.state.contentRef && officialEventsGrouped && unofficialEventsGrouped &&
                  <div className={classes.scrollSpyContainer}>
                    <NestedScrollspy
                      contentRef={this.state.contentRef}
                      sections={sections}
                      sectionLabels={{
                        'official': 'Official',
                        'unofficial': 'Unofficial',
                      }}
                      sectionItems={{
                        'official': officialEventsGrouped.map(group => {
                          return ({
                            'id': group.get('slug'),
                            'label': group.get('label'),
                          })
                        }).toJS(),
                        'unofficial': unofficialEventsGrouped.map(group => {
                          return ({
                            'id': group.get('slug'),
                            'label': group.get('label'),
                          })
                        }).toJS(),
                      }}
                      activeItemCallback={this.scrollspyActiveCallback}
                    />
                  </div>
                }
              </div>
            </Grid>
            <Grid item xs={7} lg={8}>
              <h1>{year} <em>FIRST</em> Robotics Competition Events</h1>
              {!groupedEvents &&
                <div className={classes.zeroDataContainer}>
                  <CircularProgress color='secondary' size={120} className={classes.zeroDataSpinner} />
                  <Typography variant='subheading'>Events loading</Typography>
                </div>
              }
              {groupedEvents && groupedEvents.size === 0 &&
                <div className={classes.zeroDataContainer}>
                  <EventIcon className={classes.zeroDataIcon} />
                  <Typography variant='subheading'>No events found</Typography>
                </div>
              }
              {this.state.contentRef && officialEventsGrouped && officialEventsGrouped.size !== 0 &&
                <div id='official'>
                  <h2>Official Events</h2>
                  {officialEventsGrouped.map(group => {
                    return (
                      <div key={group.get('slug')} id={group.get('slug')}>
                        <EventListCard
                          scrollRef={this.state.contentRef}
                          events={group.get('events')}
                          label={group.get('label')}
                        />
                      </div>
                    )
                  })}
                </div>
              }
              {this.state.contentRef && unofficialEventsGrouped && unofficialEventsGrouped.size !== 0 &&
                <div id='unofficial'>
                  <h2>Unofficial Events</h2>
                  {unofficialEventsGrouped.map(group => {
                    return (
                      <div key={group.get('slug')} id={group.get('slug')}>
                        <EventListCard
                          scrollRef={this.state.contentRef}
                          events={group.get('events')}
                          label={group.get('label')}
                        />
                      </div>
                    )
                  })}
                </div>
              }
            </Grid>
            <Grid item xs={2}>
              <div className={classes.rightBar}>
                {groupedEvents && <EventFilterContainer year={year} />}
              </div>
            </Grid>
          </Grid>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

EventListPageDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  setPageState: PropTypes.func.isRequired,
  yearMenuOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
  groupedEvents: ImmutablePropTypes.list,
}

export default withStyles(styles, { withTheme: true })(EventListPageDesktop)
