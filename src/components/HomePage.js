import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import TBAPageContainer from '../containers/TBAPageContainer'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    props.resetPage()
  }

  render() {
    console.log("Render Home");
    return (
      <TBAPageContainer>
        <h1>Home {this.props.test}</h1>
        <Link to="/team/254">254</Link>
      </TBAPageContainer>
    )
  }
}

export default Home;
