import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import TBAHelmet from '../components/TBAHelmet'
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'

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
        <TBAPageContainer
          history={this.props.history}
        >
          <ResponsiveLayout>
            <Paper className={classes.paper}>
              <Grid container spacing={24}>
                <Grid item xs={12} md={7}>
                  <Typography variant='display3'>Oh Noes!1!!</Typography>
                  <Typography variant='display1'>Error 404</Typography>
                  <p>Sorry, we couldn't find the thing you were looking for.</p>
                </Grid>
                <Hidden smDown>
                  <Grid item xs={12} md={5}>
                    <img className={classes.logo} src="/icon-192.png" alt="tbalogo" />
                  </Grid>
                </Hidden>
              </Grid>
            </Paper>
          </ResponsiveLayout>
        </TBAPageContainer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NotFoundPage)
