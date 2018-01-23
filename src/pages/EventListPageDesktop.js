import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Scrollspy from 'react-scrollspy'
import Typography from 'material-ui/Typography'
import EventListCard from '../components/EventListCard'
import ScrollLink from '../components/ScrollLink'
import EventFilterDialogContainer from '../containers/EventFilterDialogContainer'
import HideableBadge from '../components/HideableBadge'

const styles = theme => ({
  sideNav: {
    position: 'fixed',
    width: '100%',
    maxWidth: 180,
  },
  buttonContainer: {
    textAlign: 'center',
    margin: `${theme.spacing.unit}px 0`,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  sideNavSectionContainer: {
    width: '100%',
    listStyleType: 'none',
    margin: 0,
    padding: theme.spacing.unit,
    '& a:hover': {
      textDecoration: 'none',
      backgroundColor: '#dddddd',
      borderRight: `1px solid ${theme.palette.primary.main}`,
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
      borderRight: `1px solid ${theme.palette.primary.main}`,
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
      borderRight: `1px solid ${theme.palette.primary.main}`,
    },
  },
})

class EventListPageDesktop extends PureComponent {
  state = {isFirstRender: true}
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

  componentDidMount() {
    if (!this.props.isFreshPage) {
      const el =  document.getElementById(this.props.pageState.get('activeEventGroup'))
      if (el) {
        this.contentRef.scrollTo(0, el.offsetTop)
      }
    }

    // Rerender without cascading
    setTimeout(() => this.setState({ isFirstRender: false }), 0)
  }

  render() {
    console.log("Render EventListPageDesktop")

    const { year, groupedEvents } = this.props
    const officialEventsGrouped = groupedEvents.filter(group => group.get('isOfficial'))
    const unofficialEventsGrouped = groupedEvents.filter(group => !group.get('isOfficial'))
    const filterCount = this.props.pageState.get('districtFilters').size

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        contentRef={el => this.contentRef = el}
        refreshFunction={this.props.refreshFunction}
        restoreScroll={this.state.isFirstRender}
      >
        <ResponsiveLayout>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <div className={this.props.classes.sideNav}>
                <h1>{`${year} Events`}</h1>
                <div className={this.props.classes.buttonContainer}>
                  <HideableBadge
                    badgeContent={filterCount}
                    color='accent'
                    hidden={filterCount === 0}
                  >
                    <Button
                      color='primary'
                      raised
                      onClick={this.props.filterFunction}
                    >
                        <Icon className={this.props.classes.leftIcon}>filter_list</Icon>
                      Filter
                    </Button>
                  </HideableBadge>
                </div>
                {this.contentRef &&
                  <Scrollspy
                    rootEl={`.${this.contentRef.className}`}
                    items={['official', 'unofficial']}
                    currentClassName={this.props.classes.sideNavSectionActive}
                    className={this.props.classes.sideNavSectionContainer}
                    onUpdate={(el) => {this.updateActiveNavSection(el)}}
                  >
                    <li className={this.props.classes.sideNavSection}>
                      <ScrollLink scrollEl={this.contentRef} to='official'>Official Events</ScrollLink>
                      <Scrollspy
                        rootEl={`.${this.contentRef.className}`}
                        items={officialEventsGrouped.map(group => group.get('slug')).toJS()}
                        currentClassName={this.props.classes.sideNavItemActive}
                        onUpdate={(el) => this.updateActiveEventGroup(el, 'official')}
                      >
                        {officialEventsGrouped.map(group => {
                          return (
                            <li key={group.get('slug')} className={this.props.classes.sideNavItem}>
                              <ScrollLink scrollEl={this.contentRef} to={group.get('slug')}>{group.get('label')}</ScrollLink>
                            </li>
                          )
                        })}
                      </Scrollspy>
                    </li>
                    {unofficialEventsGrouped.size !== 0 &&
                      <li className={this.props.classes.sideNavSection}>
                        <ScrollLink scrollEl={this.contentRef} to='unofficial'>Unofficial Events</ScrollLink>
                        <Scrollspy
                          rootEl={`.${this.contentRef.className}`}
                          items={unofficialEventsGrouped.map(group => group.get('slug')).toJS()}
                          currentClassName={this.props.classes.sideNavItemActive}
                          onUpdate={(el) => this.updateActiveEventGroup(el, 'unofficial')}
                        >
                          {unofficialEventsGrouped.map(group => {
                            return (
                              <li key={group.get('slug')} className={this.props.classes.sideNavItem}>
                                <ScrollLink scrollEl={this.contentRef} to={group.get('slug')}>{group.get('label')}</ScrollLink>
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
            <Grid item xs={9}>
              <div id='official'>
                <h1>Official Events</h1>
                {officialEventsGrouped.map(group => {
                  return (
                    <div key={group.get('slug')} id={group.get('slug')}>
                      <Typography type='title' gutterBottom>{group.get('label')}</Typography>
                      <EventListCard events={group.get('events')}/>
                    </div>
                  )
                })}
              </div>
              {unofficialEventsGrouped.size !== 0 &&
                <div id='unofficial'>
                  <h1>Unofficial Events</h1>
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
        <EventFilterDialogContainer year={this.props.year} />
      </TBAPageContainer>
    )
  }
}

EventListPageDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  isFreshPage: PropTypes.bool.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  filterFunction: PropTypes.func.isRequired,
  pageState: ImmutablePropTypes.map.isRequired,
  setPageState: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  groupedEvents: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventListPageDesktop)
