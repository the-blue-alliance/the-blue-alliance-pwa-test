import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { resetPage, setNav } from '../actions'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import TBAHelmet from '../components/TBAHelmet'
import TBAPage from '../components/TBAPage'

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 5,
    padding: theme.spacing.unit * 5,
  },
  logo: {
    float: 'right',
  },
})

class NotFoundPage extends PureComponent {
  constructor(props) {
    super(props)
    props.setNav(undefined)
    props.resetPage()
    if (props.staticContext) {
      props.staticContext.statusCode = 404
    }
  }

  render() {
    console.log("Render NotFoundPage")

    const { classes } = this.props

    return (
      <React.Fragment>
        <TBAHelmet>
          <title>404 - Page Not Found</title>
        </TBAHelmet>
        <TBAPage>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={12} md={7}>
                <Typography variant='display3' gutterBottom>Oh Noes!1!!</Typography>
                <Typography variant='display1' gutterBottom>Error 404</Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography>Sorry, we couldn't find the thing you were looking for. Try searching for it.</Typography>
                TODO PUT SEARCHBOX HERE
              </Grid>
            </Grid>
          </Paper>
        </TBAPage>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setNav: (value) => dispatch(setNav(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NotFoundPage))
