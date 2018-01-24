import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {}

class ScrollRestore extends PureComponent {
  isThrottled = false

  scrollHandler = () => {
    if (!this.props.pageState.get('restoreScroll')){
      if (!this.isThrottled) {
        this.isThrottled = true
        setTimeout(() => {
          if (this.ref) {
            this.props.setPageState({ [this.props.scrollTopId]: this.ref.scrollTop })
          }
          this.isThrottled = false
        }, 100)
      }
    }
  }

  restoreScroll = () => {
    if (this.props.pageState.get('restoreScroll')) {
      this.ref.scrollTop = this.props.pageState.get(this.props.scrollTopId)
      this.props.setPageState({restoreScroll: false})
    }
  }

  componentDidMount() {
    this.restoreScroll()
  }

  componentDidUpdate() {
    this.restoreScroll()
  }

  render() {
    return (
      <div
        ref={(r)=> {
          this.ref = r
          if (this.props.contentRef) {
            this.props.contentRef(r)
          }
        }}
        className={this.props.className}
        onScroll={this.scrollHandler}
      >
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(styles)(ScrollRestore);
