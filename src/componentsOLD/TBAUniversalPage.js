// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import CircularProgress from '@material-ui/core/CircularProgress'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

// TBA Components
import TBAHelmet from '../components/TBAHelmet'
import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from '../components/ResponsiveLayout'

const styles = theme => ({
  loadingContainer: {
    paddingTop: theme.spacing.unit*3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  loadingProgress: {
    margin: '0 auto',
  },
})

class TBAUniversalPage extends PureComponent {
  render() {
    console.log("Render TBAUniversalPage")

    const {
      classes,
      children,
      title,
      metaDescription,
      refreshFunction,
    } = this.props

    let body = (
      <div className={classes.loadingContainer}>
        <CircularProgress className={classes.loadingProgress} color='secondary' size={150} />
        <Typography variant='title'>Loading...</Typography>
      </div>
    )
    if (children) {
      body = children
    }

    return (
      <React.Fragment>
        <TBAHelmet>
          <title>{title}</title>
          <meta
            name='description'
            content={metaDescription}
          />
        </TBAHelmet>
        <Hidden smDown>
          <TBAPageContainer
            refreshFunction={refreshFunction}
          >
            <ResponsiveLayout>
              {body}
            </ResponsiveLayout>
          </TBAPageContainer>
        </Hidden>
        <Hidden mdUp>
          <TBAPageContainer
            title={title}
            refreshFunction={refreshFunction}
          >
            <ResponsiveLayout>
              {body}
            </ResponsiveLayout>
          </TBAPageContainer>
        </Hidden>
      </React.Fragment>
    )
  }
}

TBAUniversalPage.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  refreshFunction: PropTypes.func.isRequired,
}

export default withStyles(styles)(TBAUniversalPage)
