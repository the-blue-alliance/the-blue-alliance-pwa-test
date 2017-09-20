import { connect } from 'react-redux'
import Home from '../components/Home.js'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer;
