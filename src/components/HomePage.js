import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    props.setBottomNav('home')
    props.resetPage()
  }

  render() {
    console.log("Render Home");
    return (
      <TBAPageContainer>
        <ResponsiveLayout>
          <h1>Home</h1>
          <Link to="/team/254">254</Link>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

export default Home;
