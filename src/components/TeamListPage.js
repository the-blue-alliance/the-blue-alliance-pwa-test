import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'
import TeamsList from './TeamsList'

const styles = {
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
}

class TeamListPage extends PureComponent {
  constructor(props) {
    super(props)
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
    setTimeout(() => this.setState({ restoreScroll: false }), 0)
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

    return (
      <div>
        <Hidden smDown>
          <TBAPageContainer
            documentTitle='Teams'
            refreshFunction={this.refreshFunction}
            contentRef={el => this.contentRef = el}
            restoreScroll={this.state.restoreScroll}
          >
            <ResponsiveLayout>
              <Grid container spacing={24}>
                <Grid item xs={2}>
                  <h1>Teams</h1>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    label="Filter teams by number, name, or location"
                    fullWidth
                    margin="normal"
                    onChange={this.handleTextFieldChange}
                    defaultValue={this.props.pageState.get('filter')}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={12}>
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
            documentTitle='Teams'
            title='Teams'
            refreshFunction={this.refreshFunction}
          >
            <div className={this.props.classes.container}>
              <TextField
                label="Filter teams by number, name, or location"
                fullWidth
                margin="normal"
                onChange={this.handleTextFieldChange}
                defaultValue={this.props.pageState.get('filter')}
              />
              <div ref={el => this.contentRef = el} className={this.props.classes.scrollContainer}>
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

export default withStyles(styles)(TeamListPage);
