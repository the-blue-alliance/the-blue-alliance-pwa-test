import { connect } from 'react-redux'
import { resetPage, setNav } from '../actions'
import NotFoundPage from '../components/NotFoundPage.js'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setNav: (value) => dispatch(setNav(value)),
});

const PageNotFoundContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFoundPage)

export default PageNotFoundContainer;
