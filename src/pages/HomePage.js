// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Actions
import { resetPage, setNav, fetchYearEvents } from '../actions'

// Selectors
import { getYear } from '../selectors/CommonPageSelectors'
import { getWeekEvents } from '../selectors/HomePageSelectors'

// Components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// TBA Components
import TBAPage from '../components/TBAPage'
import EventListItemContainer from '../containers/EventListItemContainer'

const mapStateToProps = (state, props) => ({
  // Params
  year: getYear(state, props),
  // States
  // Data
  weekEvents: getWeekEvents(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class Home extends PureComponent {
  refreshFunction = () => {
    this.props.fetchYearEvents(this.props.year)
  }

  componentDidMount() {
    this.props.resetPage({
    })
    this.props.setNav('home')
  }

  render() {
    console.log("Render Home")

    const { classes, weekEvents } = this.props

    return (
      <TBAPage
        refreshFunction={this.refreshFunction}
      >
        <Typography gutterBottom>The Blue Alliance is the best way to scout, watch, and relive the <em>FIRST</em> Robotics Competition.</Typography>
        <Typography gutterBottom>Welcome to a beta version of our new app!</Typography>

        <Typography gutterBottom>Handy links for testing:</Typography>
        <Button
          color='default'
          className={classes.button}
          variant="raised"
          component={Link}
          to='/team/254/2017'
        >
          254 in 2017
        </Button>
        <Button
          color='default'
          className={classes.button}
          variant="raised"
          component={Link}
          to='/team/254/2017#2017casj'
        >
          254 @ 2017casj
        </Button>
        <Button
          color='default'
          className={classes.button}
          variant="raised"
          component={Link}
          to='/event/2017casj'
        >
          2017casj
        </Button>
        <Button
          color='default'
          className={classes.button}
          variant="raised"
          component={Link}
          to='/match/2017casj_f1m2'
        >
          2017casj_f1m2
        </Button>
        <Button
          color='default'
          className={classes.button}
          variant="raised"
          component={Link}
          to='/team/191/2018'
        >
          191 in 2018
        </Button>

        {weekEvents &&
          <React.Fragment>
            <Typography variant='display1' gutterBottom>This Week's Events</Typography>
            <Paper>
              {weekEvents.map(event => {
                return <EventListItemContainer key={event.key} event={event}/>
              })}
            </Paper>
          </React.Fragment>
        }
      </TBAPage>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home))
