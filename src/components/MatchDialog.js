import React, { PureComponent } from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import MatchBreakdownTable from './MatchBreakdownTable'
import MatchVideos from './MatchVideos'

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
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>{this.props.matchObj.getDisplayName()}</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <MatchBreakdownTable match={this.props.matchObj}/>
            </Grid>
            <Grid item xs={6}>
              <MatchVideos match={this.props.matchObj}/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

export default MatchDialog;
