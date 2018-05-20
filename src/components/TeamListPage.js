import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'
import TeamsList from './TeamsList'

const styles = theme => ({
  sideNav: {
    position: 'fixed',
    width: 250,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
  },
  inputCard: {
    padding: theme.spacing.unit,
    zIndex: 1,
  },
})

class TeamListPage extends PureComponent {
  constructor(props) {
    super(props)
    props.setNav('teams')
    props.resetPage({
      filter: '',
    })
    this.state = {
      restoreScroll: true,
    }
  }

  componentDidMount() {
    this.refreshFunction()
  }

  componentDidUpdate() {
    // Rerender without cascading
    ReactDOM.unstable_deferredUpdates(() => this.setState({ restoreScroll: false }))
  }

  refreshFunction = () => {
    this.props.fetchTeamListAll()
  }

  handleTextFieldChange = (e) => {
    this.props.setPageState({
      filter: e.target.value
    })
  }

  render() {
    console.log("Render TeamListPage")
    const { classes } = this.props

    return (
      <div>
        <Hidden smDown>
          <TBAPageContainer
            history={this.props.history}
            documentTitle='Teams'
            refreshFunction={this.refreshFunction}
            contentRef={el => this.contentRef = el}
            restoreScroll={this.state.restoreScroll}
          >
            <ResponsiveLayout>
              <Grid container spacing={16}>
                <Grid item xs={4} lg={3}>
                  <div className={classes.sideNav}>
                    <h1>Teams</h1>
                    <TextField
                      label="Filter by number, name, or location"
                      fullWidth
                      multiline
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      onChange={this.handleTextFieldChange}
                      defaultValue={this.props.pageState.get('filter')}
                    />
                  </div>
                </Grid>
                <Grid item xs={8} lg={9}>
                  <TeamsList
                    scrollElement={this.contentRef}
                    teams={this.props.allTeams}
                    filter={this.props.pageState.get('filter')}
                  />
                </Grid>
              </Grid>
            </ResponsiveLayout>
          </TBAPageContainer>
        </Hidden>
        <Hidden mdUp>
          <TBAPageContainer
            history={this.props.history}
            documentTitle='Teams'
            title='Teams'
            refreshFunction={this.refreshFunction}
          >
            <div className={classes.container}>
              <Paper className={classes.inputCard}>
                <TextField
                  label="Filter by number, name, or location"
                  fullWidth
                  margin="normal"
                  onChange={this.handleTextFieldChange}
                  defaultValue={this.props.pageState.get('filter')}
                />
              </Paper>
              <div ref={el => this.contentRef = el} className={classes.scrollContainer}>
                <TeamsList
                  scrollElement={this.contentRef}
                  teams={this.props.allTeams}
                  filter={this.props.pageState.get('filter')}
                />
              </div>
            </div>
          </TBAPageContainer>
        </Hidden>
      </div>
    )
  }
}

export default withStyles(styles)(TeamListPage)
