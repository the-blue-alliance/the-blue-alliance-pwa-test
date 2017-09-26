import React, { PureComponent } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import TBAPageContainer from '../containers/TBAPageContainer'

class MatchDialog extends PureComponent {
  handleRequestClose = (e) => {
    e.stopPropagation()
    this.props.history.goBack()
  }

  render() {
    console.log("Render Match Dialog")

    return (
      <Dialog
        open={true}
        onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>Match {this.props.match.params.matchKey}</DialogTitle>
        <div>
          Details go here!
        </div>
      </Dialog>
    )
  }
}

export default MatchDialog;
