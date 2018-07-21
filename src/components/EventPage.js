import React, { PureComponent } from 'react'
import classNames from 'classnames'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InfoOutlineIcon from '@material-ui/icons/InfoOutline'
import EventIcon from '@material-ui/icons/Event'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ResponsiveLayout from './ResponsiveLayout'
import MatchTableContainer from '../containers/MatchTableContainer'
import MatchList from './MatchList'
import TeamsList from './TeamsList'

import TBAHelmet from '../components/TBAHelmet'
import TBAPageContainer from '../containers/TBAPageContainer'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'

import { fetchEventInfo, fetchEventMatches, fetchEventTeams } from '../actions'

const styles = theme => ({
  hidden: {
    display: 'none',
  },
  titleName: {
    float: 'left',
    width: '100%',
  },
  titleYear: {
    float: 'left',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
    ['-webkit-overflow-scrolling']: 'touch', // Smooth scrolling on iOS
  },
  paper: {
    margin: theme.spacing.unit,
  },
  matchesCard: {
    margin: theme.spacing.unit,
    padding: `${theme.spacing.unit/2}px 0px`,
  },
})

class EventPage extends PureComponent {
  static fetchData({ store, params }) {
    return Promise.all([
      store.dispatch(fetchEventInfo(params.eventKey)),
      store.dispatch(fetchEventMatches(params.eventKey)),
      store.dispatch(fetchEventTeams(params.eventKey)),
    ])
  }

  state = {
    matchScrollRef: null,
  }

  reset = props => {
     // Set without overriding
    props.resetPage({
      tabIdx: 0,
    })
    // Fetch data
    this.refreshFunction()
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setNav('events')
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.props.eventKey)
    this.props.fetchEventMatches(this.props.eventKey)
    this.props.fetchEventTeams(this.props.eventKey)
  }

  tabHandleChangeIndex = tabIdx => {
    this.props.setPageState({tabIdx, 'hash': tabIdx})
  }

  tabHandleChange = (event, tabIdx) => {
    this.props.setPageState({tabIdx, 'hash': tabIdx})
  }

  render() {
    console.log("Render Event Page")

    const { classes, event, matches, teams } = this.props

    var name = null
    var shortName = null
    var year = undefined
    if (event) {
      year = event.year
      name = `${event.name} ${year}`
      shortName = event.safeShortName()
    }

    return (
      <div>
        <TBAHelmet>
          <title>{name}</title>
          {event &&
            <meta
              name='description'
              content={`Videos and match results for the ${year} ${event.name} FIRST Robotics Competition in ${event.getCityStateCountry()}.`}
            />
          }
        </TBAHelmet>
        <Hidden smDown>
          <TBAPageContainer
            history={this.props.history}
            refreshFunction={this.refreshFunction}
            contentRef={el => this.contentRef = el}
          >
            <ResponsiveLayout>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <h1>{name}</h1>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <Tabs
                      value={this.props.tabIdx}
                      onChange={this.tabHandleChange}
                      fullWidth
                    >
                      <Tab label="Results" />
                      <Tab label="Teams" />
                    </Tabs>
                  </Paper>
                  <div className={classNames({[classes.hidden]: this.props.tabIdx !== 0})}>
                    <Grid container spacing={24}>
                      <Grid item xs={6}>
                        <h3>Qualification Results</h3>
                        <MatchTableContainer matches={this.props.qualMatches} />
                      </Grid>
                      <Grid item xs={6}>
                        <h3>Playoff Results</h3>
                        <MatchTableContainer matches={this.props.playoffMatches} />
                      </Grid>
                    </Grid>
                  </div>
                  {this.props.tabIdx === 1 &&
                  <div>
                    <TeamsList scrollElement={this.contentRef} teams={teams} year={year}/>
                  </div>}
                </Grid>
              </Grid>
            </ResponsiveLayout>
          </TBAPageContainer>
        </Hidden>
        <Hidden mdUp>
          <TBAPageContainer
            history={this.props.history}
            title={
              <React.Fragment>
                <Typography variant='title' color='inherit' className={classes.titleName} noWrap>
                  {shortName}
                </Typography>
                <br/>
                <Typography variant='subheading' color='inherit' className={classes.titleYear}>
                  {year}
                </Typography>
              </React.Fragment>
            }
            refreshFunction={this.refreshFunction}
            tabs={
              <Tabs
                value={this.props.tabIdx}
                onChange={this.tabHandleChange}
                scrollable
                scrollButtons="auto"
              >
                <Tab label={"Info"} />
                <Tab label={"Matches"} />
                <Tab label={"Teams"} />
              </Tabs>
            }
          >
            <SwipeableViews
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              index={this.props.tabIdx}
              onChangeIndex={this.tabHandleChangeIndex}
            >
              <Paper className={classes.paper}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <InfoOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItem>
                </List>
                {event && event.getDateString() &&
                  <React.Fragment>
                    <Divider />
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary={event.getDateString()} />
                      </ListItem>
                    </List>
                  </React.Fragment>
                }
              </Paper>
              {matches ?
                <ScrollRestoreContainer
                  scrollId="matches"
                  className={classes.scrollContainer}
                  contentRef={el => {
                    if (!this.state.matchScrollRef) {
                      this.setState({matchScrollRef: el})
                    }
                  }}
                >
                  <Paper className={classes.matchesCard}>
                    <MatchList scrollElement={this.state.matchScrollRef} matches={matches}/>
                  </Paper>
                </ScrollRestoreContainer>
                :
                <div>NO MATCHES</div>
              }
              <div ref={el => this.contentRef = el} className={classes.scrollContainer}>
                <TeamsList scrollElement={this.contentRef} teams={teams} year={year}/>
              </div>
            </SwipeableViews>
          </TBAPageContainer>
        </Hidden>
      </div>
    )

  }
}

export default withStyles(styles)(EventPage)
