import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Home from '../components/Home.js'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

const HomeContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));

export default HomeContainer;
