import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {}

class ScrollRestore extends PureComponent {
  scrollHandler = () => {
    if (!this.props.isFirstRender){
      this.props.setPageState({ [this.props.scrollTopId]: this.ref.scrollTop })
    }
  }

  componentDidUpdate() {
    if (this.props.isFirstRender) {
      this.ref.scrollTop = this.props.pageState.get(this.props.scrollTopId)
    }
  }

  render() {
    console.log("Render ScrollRestore")

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
