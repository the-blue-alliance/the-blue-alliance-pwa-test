import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'

import TBAAppBarContainer from '../containers/TBAAppBarContainer'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'

const styles = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,  // For some reason this is necessary to scroll to work on fixed sidenav
    position: 'fixed',
    top: 56,
    right: 0,
    bottom: 56,
    left: 0,
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
    [theme.breakpoints.up('md')]: {
      bottom: 0,
      left: 180,
    },
  },
  tabbedContent: {
    top: 56 + 48,
    [theme.breakpoints.up('sm')]: {
      top: 64 + 48,
    },
  },
})

class TBAPage extends PureComponent {
  getDocumentTitle = () => {
    if (this.props.documentTitle) {
      return `${this.props.documentTitle} - The Blue Alliance`
    } else {
      return 'The Blue Alliance'
    }
  }

  componentWillMount() {
    document.title = this.getDocumentTitle()
  }

  componentWillUpdate() {
    document.title = this.getDocumentTitle()
  }

  render() {
    console.log("Render TBAPage")

    return (
      <div>
        <TBAAppBarContainer
          history={this.props.history}
          title={this.props.title}
          refreshFunction={this.props.refreshFunction}
          filterFunction={this.props.filterFunction}
          filterCount={this.props.filterCount}
          tabs={this.props.tabs}
        />
        <ScrollRestoreContainer
          scrollTopId={'pageScrollTop'}
          contentRef={this.props.contentRef}
          className={classNames({
            [this.props.classes.content]: true,
            [this.props.classes.tabbedContent]: this.props.tabs,
          })}
        >
          {this.props.children}
        </ScrollRestoreContainer>
      </div>
    )
  }
}

TBAPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  filterCount: PropTypes.number,
}

export default withStyles(styles)(TBAPage)
