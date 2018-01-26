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
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Select from 'material-ui/Select'
import { Link } from 'react-router-dom'
import Scrollspy from 'react-scrollspy'

// TBA Components
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'
import EventListCard from '../components/EventListCard'
import HideableBadge from '../components/HideableBadge'
import MatchTable from '../components/MatchTable'
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
  eventCard: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
})

class TeamPageDesktop extends PureComponent {
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
    // this.activeSection = el ? el.id : null
    // if (this.activeEventGroup[this.activeSection]) {
    //   this.props.setPageState({activeEventGroup: this.activeEventGroup[this.activeSection]})
    // }
  }

  updateActiveEvent = (el, section) => {
    // this.activeEventGroup[section] = el ? el.id : null
    // if (this.activeEventGroup[this.activeSection]) {
    //   this.props.setPageState({activeEventGroup: this.activeEventGroup[this.activeSection]})
    // }
  }

  handleYearOpen = event => {
    this.setState({ yearMenuAnchorEl: event.currentTarget });
    this.props.setYearMenuOpen(true)
  }

  handleYearSelect = year => {
    this.props.setYearMenuOpen(false)
    if (year !== this.props.year) {
      this.props.pushHistory(`/team/${this.props.teamNumber}/${year}`)
    }
  }

  render() {
    console.log("Render TeamPageDesktop")

    const { classes, year, validYears, isLoading, yearMenuOpen, teamNumber, team, teamYearEvents, matchesByEvent } = this.props

    let name = null
    let nickname = null
    if (team) {
      name = team.get('name')
      nickname = team.get('nickname')
    }

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
                  {`${year} Season`}<Icon className={classes.rightIcon}>arrow_drop_down</Icon>
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
                      {y} Season
                    </MenuItem>
                  )}
                </Menu>

                {this.state.contentRef &&
                  <Scrollspy
                    rootEl={`.${this.state.contentRef.className}`}
                    items={['team-info', 'event-results', 'media', 'robot-profile']}
                    currentClassName={classes.sideNavSectionActive}
                    className={classes.sideNavSectionContainer}
                    onUpdate={(el) => {this.updateActiveNavSection(el)}}
                  >
                    <li className={classes.sideNavSection}>
                      <ScrollLink scrollEl={this.state.contentRef} to='team-info'>Team Info</ScrollLink>
                    </li>
                    <li className={classes.sideNavSection}>
                      <ScrollLink scrollEl={this.state.contentRef} to='event-results'>Event Results</ScrollLink>
                      {teamYearEvents !== 0  &&
                        <Scrollspy
                          rootEl={`.${this.state.contentRef.className}`}
                          items={teamYearEvents.map(event => event.get('key')).toJS()}
                          currentClassName={classes.sideNavItemActive}
                          onUpdate={(el) => this.updateActiveEvent(el, 'event-results')}
                        >
                          {teamYearEvents.map(event => {
                            return (
                              <li key={event.get('key')} className={classes.sideNavItem}>
                                <ScrollLink scrollEl={this.state.contentRef} to={event.get('key')}>{event.get('short_name')}</ScrollLink>
                              </li>
                            )
                          })}
                        </Scrollspy>
                      }
                    </li>
                    <li className={classes.sideNavSection}>
                      <ScrollLink scrollEl={this.state.contentRef} to='media'>Media</ScrollLink>
                    </li>
                    <li className={classes.sideNavSection}>
                      <ScrollLink scrollEl={this.state.contentRef} to='robot-profile'>Robot Profile</ScrollLink>
                    </li>
                  </Scrollspy>
                }
              </div>
            </Grid>
            <Grid item xs={9} lg={10}>
              <h1 id='team-info'>Team {teamNumber}{nickname && ` - ${nickname}`}</h1>
              {name && <p>aka {name}</p>}
              <div id='event-results'>
                <h2>Event Results</h2>
                {teamYearEvents.valueSeq().map(function(event) {
                  return (
                    <Paper key={event.get('key')} id={event.get('key')} className={classes.eventCard} elevation={4}>
                      <Grid container spacing={24}>
                        <Grid item xs={4}>
                          <h3><Link to={`/event/${event.get('key')}`}>{event.get('name')}</Link></h3>
                        </Grid>
                        <Grid item xs={8}>
                          <MatchTable matches={matchesByEvent.get(event.get('key'))} />
                        </Grid>
                      </Grid>
                    </Paper>
                  )
                })}
              </div>
              <div id='media'>
                <h2>Media</h2>
              </div>
              <div id='robot-profile'>
                <h2>Robot Profile</h2>
              </div>
            </Grid>
          </Grid>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

TeamPageDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  setPageState: PropTypes.func.isRequired,
  yearMenuOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
}

export default withStyles(styles)(TeamPageDesktop)
