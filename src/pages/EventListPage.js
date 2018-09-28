// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Set } from 'immutable'

// Actions
import { push } from 'connected-react-router'
import { resetPage, setPageState, setNav, fetchYearEvents } from '../actions'

// Selectors
import { getYear, getMaxYear } from '../selectors/CommonPageSelectors'
import { getFilteredGroupedEvents } from '../selectors/EventListPageSelectors'

// Components
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import NoSsr from '@material-ui/core/NoSsr'
import Typography from '@material-ui/core/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

// TBA Components
import TBAPage from '../components/TBAPage'
import NestedScrollspy from '../components/NestedScrollspy'
import EventListCard from '../components/EventListCard'
import EventFilterSidebarContainer from '../containers/EventFilterSidebarContainer'
import EventFilterDialogContainer from '../containers/EventFilterDialogContainer'

const mapStateToProps = (state, props) => ({
  // Params
  year: getYear(state, props),
  maxYear: getMaxYear(state),
  // States
  // Data
  groupedEvents: getFilteredGroupedEvents(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  pushHistory: (path) => dispatch(push(path)),
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
})

const styles = theme => ({
  sideNav: {
    position: 'sticky',
    top: 56 + theme.spacing.unit*4,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 + theme.spacing.unit*4,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64 + theme.spacing.unit*4,
    },
  },
  scrollSpy: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    height: 'calc(100vh - 10rem)',
    overflowY: 'auto',
  },
  rightBarContainer: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  rightBar: {
    position: 'sticky',
    top: 0,
    height: 'calc(100vh - 8rem)',
    width: '100%',
    paddingTop: theme.spacing.unit*3,
  },
  zeroDataContainer: {
    paddingTop: theme.spacing.unit*3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class EventListPage extends PureComponent {
  state = {
    yearMenuAnchorEl: null,
  }

  refreshFunction = () => {
    this.props.fetchYearEvents(this.props.year)
  }

  handleYearOpen = event => {
    this.setState({ yearMenuAnchorEl: event.currentTarget });
  }

  handleYearClose = event => {
    this.setState({ yearMenuAnchorEl: null });
  }

  handleYearSelect = year => {
    this.handleYearClose()
    if (year !== this.props.year) {
      requestAnimationFrame(() => this.props.pushHistory(`/events/${year}`))
    }
  }

  componentDidMount() {
    this.props.resetPage({
      locationFilter: '',
      districtFilters: Set(),
      yearMenuAnchorEl: false,
    })
    this.props.setNav('events')

    requestAnimationFrame(() => this.refreshFunction())
  }

  render() {
    console.log("Render EventListPage")

    const { classes, year, maxYear, groupedEvents } = this.props
    const { yearMenuAnchorEl } = this.state

    // Compute valid years
    let validYears = []
    for (let y=maxYear; y>=1992; y--) {
      validYears.push(y)
    }

    // Event sections
    const officialEventsGrouped = groupedEvents && groupedEvents.filter(group => group.get('isOfficial'))
    const unofficialEventsGrouped = groupedEvents && groupedEvents.filter(group => !group.get('isOfficial'))

    let mainSections = []
    let sections = []
    if (officialEventsGrouped && officialEventsGrouped.size > 0) {
      mainSections.push('official')
      officialEventsGrouped.forEach(g => sections.push({key: g.get('slug'), label: g.get('label')}))
    }
    if (unofficialEventsGrouped && unofficialEventsGrouped.size > 0) {
      mainSections.push('unofficial')
      unofficialEventsGrouped.forEach(g => sections.push({key: g.get('slug'), label: g.get('label')}))
    }

    return (
      <TBAPage
        title={`${year} Events`}
        metaDescription={`Event list for the ${year} FIRST Robotics Competition.`}
        refreshFunction={this.refreshFunction}
      >
        <Grid container spacing={16}>
          <Grid item xs={12} md={3} lg={2}>
            <div className={classes.sideNav}>
              <Button
                color='primary'
                variant='raised'
                onClick={this.handleYearOpen}
              >
                {`${year} Events`} <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={yearMenuAnchorEl}
                open={Boolean(yearMenuAnchorEl)}
                onClose={this.handleYearClose}
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
              {groupedEvents && <div className={classes.scrollSpy}>
                <NestedScrollspy
                  sections={mainSections}
                  sectionLabels={['Official', 'Unofficial']}
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
                />
              </div>}
            </div>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Typography variant='display1' gutterBottom>{year} <i>FIRST</i> Robotics Competition Events</Typography>
            {!groupedEvents &&
              <div className={classes.zeroDataContainer}>
                <CircularProgress color='secondary' size={120} className={classes.zeroDataSpinner} />
                <Typography variant='subheading'>Events loading</Typography>
              </div>
            }
            {officialEventsGrouped && officialEventsGrouped.size !== 0 &&
              <div id='official'>
                <Typography variant='headline'>Official Events</Typography>
                {officialEventsGrouped.map(group => {
                  return (
                    <div key={group.get('slug')} id={group.get('slug')}>
                      <EventListCard
                        events={group.get('events')}
                        label={group.get('label')}
                        sections={sections}
                        sectionKey={group.get('slug')}
                      />
                    </div>
                  )
                })}
              </div>
            }
            {unofficialEventsGrouped && unofficialEventsGrouped.size !== 0 &&
              <div id='unofficial'>
                <Typography variant='headline'>Unofficial Events</Typography>
                {unofficialEventsGrouped.map(group => {
                  return (
                    <div key={group.get('slug')} id={group.get('slug')}>
                      <EventListCard
                        events={group.get('events')}
                        label={group.get('label')}
                        sections={sections}
                        sectionKey={group.get('slug')}
                      />
                    </div>
                  )
                })}
              </div>
            }
          </Grid>
          <NoSsr>
            <Grid item xs={2} className={classes.rightBarContainer}>
              <div className={classes.rightBar}>
                {groupedEvents && <EventFilterSidebarContainer year={year} />}
              </div>
            </Grid>
          </NoSsr>
        </Grid>
        <NoSsr>
          <EventFilterDialogContainer year={year} />
        </NoSsr>
      </TBAPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventListPage))
