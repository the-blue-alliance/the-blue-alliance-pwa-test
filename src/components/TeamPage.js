import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';
import Hidden from 'material-ui/Hidden';
import Scrollspy from 'react-scrollspy'

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'
import MatchTable from './MatchTable'

const styles = theme => ({
  sideNav: {
    position: 'fixed',
    maxWidth: 150,
  },
  eventCard: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  active: {
    fontWeight: 'bold',
  },
});

class TeamPage extends PureComponent {
  reset = props => {
     // Set without overriding
    props.resetPage({
      restoreScroll: true,
    })
    // Override restoreScroll
    props.setPageState({restoreScroll: true})
    // Fetch data
    this.refreshFunction()
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setBottomNav('teams')
  }

  refreshFunction = () => {
    this.props.fetchTeamInfo(this.props.teamNumber)
    this.props.fetchTeamYearEvents(this.props.teamNumber, this.props.year)
    this.props.fetchTeamYearMatches(this.props.teamNumber, this.props.year)
  }

  render() {
    console.log("Render Team Page")

    const { classes } = this.props

    const teamNumber = this.props.teamNumber
    const year = this.props.year
    const team = this.props.team
    const teamYearEvents = this.props.teamYearEvents
    const matchesByEvent = this.props.matchesByEvent

    var name = null
    var nickname = null
    var eventList = <CircularProgress color="secondary" size={100} />
    var eventScrollspy = <CircularProgress color="secondary" size={100} />
    var scrollspyItems = []
    if (team) {
      if (team) {
        name = team.get('name')
        nickname = team.get('nickname')
      }
    }
    if (teamYearEvents) {
      eventList = teamYearEvents.valueSeq().map(function(event) {
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
      })

      eventScrollspy = teamYearEvents.valueSeq().map(function(event) {
        return (
          <li key={event.get('key')}>
            <a href={`#${event.get('key')}`}>{event.get('short_name')}</a>
          </li>
        )
      })

      scrollspyItems = teamYearEvents.valueSeq().map(function(event) {
        return event.get('key')
      }).toJS()
    }

    return (
      <div>
        <Hidden smDown>
          <TBAPageContainer
            history={this.props.history}
            documentTitle={`Team ${teamNumber} (${year})`}
            refreshFunction={this.refreshFunction}
            contentRef={el => this.contentRef = el}
          >
            <ResponsiveLayout>
              <Grid container spacing={24}>
                <Grid item xs={3} lg={2}>
                  <div className={classes.sideNav}>
                    <Select
                      value={2018}
                      // onChange={this.handleChange}
                      // input={<Input name="age" id="age-simple" />}
                    >
                      <MenuItem value={2018}>2018 Season</MenuItem>
                      <MenuItem value={2017}>2017 Season</MenuItem>
                      <MenuItem value={2016}>2016 Season</MenuItem>
                    </Select>
                    {this.contentRef &&
                    <Scrollspy
                      rootEl={`.${this.contentRef.className}`}
                      items={scrollspyItems}
                      currentClassName={classes.active}
                    >
                      {eventScrollspy}
                    </Scrollspy>}
                  </div>
                </Grid>
                <Grid item xs={9} lg={10}>
                  <h1>Team {teamNumber}{nickname && ` - ${nickname}`}</h1>
                  {name && <p>aka {name}</p>}
                  {eventList}
                </Grid>
              </Grid>
            </ResponsiveLayout>
          </TBAPageContainer>
        </Hidden>
        <Hidden mdUp>
          <TBAPageContainer
            history={this.props.history}
            documentTitle={`Team ${teamNumber} (${year})`}
            title={`Team ${teamNumber} (${year})`}
            refreshFunction={this.refreshFunction}
          >
            <h1>Team {teamNumber}{nickname && ` - ${nickname}`}</h1>
            {name && <p>aka {name}</p>}
            {eventList}
          </TBAPageContainer>
        </Hidden>
      </div>
    )
  }
}

export default withStyles(styles)(TeamPage)
