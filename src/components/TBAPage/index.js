// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Actions
import { fetchAPIStatus } from '../../actions'

// TBA Components
import TBAHelmet from '../TBAHelmet'
import TBAAppBar from './TBAAppBar'

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  fetchAPIStatus: () => dispatch(fetchAPIStatus()),
})

const styles = theme => ({
  container: {
    marginTop: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      marginTop: 48,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
    marginBottom: 56,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      marginLeft: 190,
    },
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: `${theme.spacing.unit*3}px ${theme.spacing.unit}px 0`,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*3}px 0`,
    },
  },
})

class TBAPage extends PureComponent {
  refreshFunction = () => {
    this.props.fetchAPIStatus()
    this.props.refreshFunction && this.props.refreshFunction()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    // Fetch data async
    requestAnimationFrame(() => this.refreshFunction())
  }

  render() {
    console.log("Render TBAPage")

    const {
      classes,
      children,
      title,
      metaDescription,
      metaImage,
    } = this.props

    return (
      <React.Fragment>
        <TBAHelmet>
          <title>{title}</title>
          {metaDescription && <meta
            name='description'
            content={metaDescription}
          />}
          <meta
            name='og:image'
            content={metaImage ? metaImage : 'https://pwa.thebluealliance.com/icon-512.png'}
          />
        </TBAHelmet>
        <TBAAppBar
          title={title}
          refreshFunction={this.refreshFunction}
        />
        <div className={classes.container}>
          <main className={classes.content}>
            {children}
          </main>
        </div>
      </React.Fragment>
    )
  }
}

TBAPage.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  metaDescription: PropTypes.string,
  metaImage: PropTypes.string,
  refreshFunction: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TBAPage))
