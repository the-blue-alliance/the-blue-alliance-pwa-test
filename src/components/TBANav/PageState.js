import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getCurrentPageState } from '../../selectors/CommonPageSelectors'

const styles = theme => ({
  root: {
    overflow: 'scroll',
  },
})

class PageState extends PureComponent {
  render() {
    console.log("Render PageState")

    const { classes, currentPageState } = this.props

    return (
      <pre className={classes.root}>
        {JSON.stringify(currentPageState.toJS(), null, 2)}
      </pre>
    )
  }
}

const mapStateToProps = (state, props) => ({
  currentPageState: getCurrentPageState(state, props),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PageState))
