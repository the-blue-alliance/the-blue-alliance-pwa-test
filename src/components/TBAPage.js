import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import TBANavBarContainer from '../containers/TBANavBarContainer'

const styles = theme => ({
  content: {
    position: 'absolute',
    top: 56,
    right: 0,
    bottom: 0,
    left: 0,
    overflowX: 'hidden',
    // padding: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      top: 64,
      // padding: theme.spacing.unit * 3,
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
    this.props.closeMobileDrawer()
    // document.title = this.getDocumentTitle()
  }

  componentWillUpdate() {
    // document.title = this.getDocumentTitle()
  }

  render() {
    console.log("Render TBAPage")

    return (
      <div>
        <TBANavBarContainer
          title={this.props.title}
          refreshFunction={this.props.refreshFunction}
          filterFunction={this.props.filterFunction}
          tabs={this.props.tabs}
        />
        <div
          className={classNames({
            [this.props.classes.content]: true,
            [this.props.classes.tabbedContent]: this.props.tabs,
          })}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TBAPage);
