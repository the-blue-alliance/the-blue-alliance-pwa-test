import { connect } from 'react-redux'
import { resetPage, setBottomNav } from '../actions'
import HomePage from '../components/HomePage.js'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

export default HomePageContainer;
