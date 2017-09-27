import React, { PureComponent } from 'react';

import TBAPageContainer from '../containers/TBAPageContainer'

class MatchPage extends PureComponent {
  constructor(props) {
    super(props)
    // this.state = {
    //   matchKey: props.match.params.matchKey,
    // }
    this.props.resetPage(this.props.location.key)
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
  }

  render() {
    console.log("Render Match Page")

    // const matchKey = this.state.matchKey
    // const match = this.state.match

    return (
      <TBAPageContainer
        title={`Match ${this.props.match.params.matchKey}`}
        // refreshFunction={this.refreshFunction}
      >
        <h1>Match {this.props.match.params.matchKey}</h1>
      </TBAPageContainer>
    )
  }
}

export default MatchPage;
