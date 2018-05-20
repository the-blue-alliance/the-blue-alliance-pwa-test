import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import SearchPageMobile from '../pages/SearchPageMobile'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  // Data
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),

})

const SearchPageMobileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPageMobile)

export default SearchPageMobileContainer
