import { connect } from 'react-redux'
import HomePage from '../components/HomePage.js'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

export default HomePageContainer;
