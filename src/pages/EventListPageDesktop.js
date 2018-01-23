import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'

import Grid from 'material-ui/Grid'
import Scrollspy from 'react-scrollspy'
import EventListCard from '../components/EventListCard'
import ScrollLink from '../components/ScrollLink'

const styles = theme => ({
  sideNav: {
    position: 'fixed',
    maxWidth: 150,
  },
  sideNavSectionContainer: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    '& a:hover': {
      textDecoration: 'none',
      backgroundColor: '#dddddd',
      borderRight: `1px solid ${theme.palette.primary.main}`,
    }
  },
  sideNavSection: {
    '& > a': {
      display: 'block',
      padding: '5px 20px',
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
  render() {
    console.log("Render EventListPageDesktop")

    const { year, groupedEvents } = this.props

    return (
      <TBAPageContainer
        documentTitle={this.props.documentTitle}
        contentRef={el => this.contentRef = el}
        refreshFunction={this.props.refreshFunction}
        // filterFunction={this.filterFunction}
        // restoreScroll={this.state.isFirstRender}
      >
        <ResponsiveLayout>
          <Grid container spacing={24}>
            <Grid item xs={3} lg={2}>
              <div className={this.props.classes.sideNav}>
                <h1>{`${year} Events`}</h1>
                {this.contentRef &&
                  <Scrollspy
                    rootEl={`.${this.contentRef.className}`}
                    items={['official', 'unofficial']}
                    currentClassName={this.props.classes.sideNavSectionActive}
                    className={this.props.classes.sideNavSectionContainer}
                  >
                    <li className={this.props.classes.sideNavSection}>
                      <ScrollLink scrollEl={this.contentRef} to='official'>Official Events</ScrollLink>
                      <Scrollspy
                        rootEl={`.${this.contentRef.className}`}
                        items={groupedEvents.filter(group => group.get('isOfficial')).map(group => group.get('slug')).toJS()}
                        currentClassName={this.props.classes.sideNavItemActive}
                      >
                        {groupedEvents.filter(group => group.get('isOfficial')).map(group => {
                          return (
                            <li key={group.get('slug')} className={this.props.classes.sideNavItem}>
                              <ScrollLink scrollEl={this.contentRef} to={group.get('slug')}>{group.get('label')}</ScrollLink>
                            </li>
                          )
                        })}
                      </Scrollspy>
                    </li>
                    <li className={this.props.classes.sideNavSection}>
                      <ScrollLink scrollEl={this.contentRef} to='unofficial'>Unofficial Events</ScrollLink>
                      <Scrollspy
                        rootEl={`.${this.contentRef.className}`}
                        items={groupedEvents.filter(group => !group.get('isOfficial')).map(group => group.get('slug')).toJS()}
                        currentClassName={this.props.classes.sideNavItemActive}
                      >
                        {groupedEvents.filter(group => !group.get('isOfficial')).map(group => {
                          return (
                            <li key={group.get('slug')} className={this.props.classes.sideNavItem}>
                              <ScrollLink scrollEl={this.contentRef} to={group.get('slug')}>{group.get('label')}</ScrollLink>
                            </li>
                          )
                        })}
                      </Scrollspy>
                    </li>
                  </Scrollspy>
                }
              </div>
            </Grid>
            <Grid item xs={9} lg={10}>
              <div id='official'>
                <h1>Official Events</h1>
                {groupedEvents.filter(group => group.get('isOfficial')).map(group => {
                  return (
                    <div key={group.get('slug')} id={group.get('slug')}>
                      <h2>{group.get('label')}</h2>
                      <EventListCard events={group.get('events')}/>
                    </div>
                  )
                })}
              </div>
              <div id='unofficial'>
                <h1>Unofficial Events</h1>
                {groupedEvents.filter(group => !group.get('isOfficial')).map(group => {
                  return (
                    <div key={group.get('slug')} id={group.get('slug')}>
                      <h2>{group.get('label')}</h2>
                      <EventListCard events={group.get('events')}/>
                    </div>
                  )
                })}
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
  documentTitle: PropTypes.string.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  groupedEvents: ImmutablePropTypes.list,
}

export default withStyles(styles)(EventListPageDesktop)
