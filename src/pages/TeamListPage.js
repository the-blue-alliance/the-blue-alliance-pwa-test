// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

// Actions
import { resetPage, setPageState, setNav, fetchTeamListAll } from '../actions'

// Selectors
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getSortedTeams } from '../selectors/TeamListPageSelectors'

// Components
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

// TBA Components
import TBAPage from '../components/TBAPage'
import TeamsList from '../components/TeamsList'

const mapStateToProps = (state, props) => ({
  // States
  pageState: getCurrentPageState(state, props),
  // Params
  // Data
  allTeams: getSortedTeams(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchTeamListAll: () => dispatch(fetchTeamListAll()),
})

const styles = theme => ({
  inputCard: {
    position: 'sticky',
    padding: theme.spacing.unit,
    margin: `${-theme.spacing.unit*3}px ${-theme.spacing.unit}px ${theme.spacing.unit}px`,
    zIndex: 1,
    maxWidth: theme.breakpoints.values.sm,
    top: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
      margin: `${-theme.spacing.unit*3}px auto ${theme.spacing.unit}px`,
    },
  },
  list: {
    maxWidth: theme.breakpoints.values.sm,
    margin: '0 auto',
    paddingBottom: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit*3}px`,
    },
  },
})

class TeamListPage extends PureComponent {
  refreshFunction = () => {
    this.props.fetchTeamListAll()
  }

  componentDidMount() {
    this.props.resetPage({
      filter: '',
    })
    this.props.setNav('teams')

    requestIdleCallback(() => this.refreshFunction())
  }

  handleTextFieldChange = (e) => {
    const filter = e.target.value
    requestIdleCallback(() => this.props.setPageState({
      filter,
    }))
  }

  render() {
    console.log("Render TeamListPage")
    const { classes, allTeams, pageState } = this.props

    return (
      <TBAPage
        title='Teams'
        metaDescription='List of FIRST Robotics Competition teams.'
        refreshFunction={this.refreshFunction}
      >
        <Paper className={classes.inputCard} square>
          <TextField
            label="Filter by number, name, or location"
            fullWidth
            margin="normal"
            onChange={this.handleTextFieldChange}
            defaultValue={pageState.get('filter')}
          />
        </Paper>
        <div className={classes.list}>
          <TeamsList
            teams={allTeams}
            filter={pageState.get('filter')}
          />
        </div>
      </TBAPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamListPage))
